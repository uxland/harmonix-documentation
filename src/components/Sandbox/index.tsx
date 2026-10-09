import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import sdk, { type Project } from '@stackblitz/sdk';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * The plugin projects of `npm create @uxland/harmonix-plugin`, running in StackBlitz.
 *
 * The files are not copied here: they are read from the published creator package (through
 * jsDelivr) every time, so the sandbox always shows exactly what the creator generates today.
 * StackBlitz then installs the dependencies and runs `npm run dev` in the browser.
 */
type Template = 'react' | 'lit' | 'angular';

const PACKAGE = '@uxland/create-harmonix-plugin';
const TEMPLATES: { id: Template; label: string; logo: string; open: string }[] = [
  { id: 'react', label: 'React', logo: '/img/logo-react.svg', open: 'src/views/main-view.tsx,src/plugin.ts' },
  { id: 'lit', label: 'Lit', logo: '/img/logo-lit.svg', open: 'src/views/main-view.ts,src/plugin.ts' },
  {
    id: 'angular',
    label: 'Angular',
    logo: '/img/logo-angular.svg',
    open: 'projects/my-plugin/src/views/main-view.component.html,projects/my-plugin/src/plugin.ts',
  },
];

/** The latest published version of the creator. */
const latestVersion = async () => {
  const response = await fetch(`https://data.jsdelivr.com/v1/packages/npm/${PACKAGE}/resolved?specifier=latest`);
  if (!response.ok) throw new Error(`jsDelivr answered ${response.status}`);
  return (await response.json()).version as string;
};

/** The files of a template, as `npm create` would write them. */
const templateFiles = async (version: string, template: Template) => {
  const listing = await fetch(`https://data.jsdelivr.com/v1/packages/npm/${PACKAGE}@${version}?structure=flat`);
  if (!listing.ok) throw new Error(`jsDelivr answered ${listing.status}`);
  const prefix = `/templates/${template}/`;
  const paths: string[] = (await listing.json()).files
    .map((file: { name: string }) => file.name)
    .filter((name: string) => name.startsWith(prefix));
  const entries = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/${PACKAGE}@${version}${path}`);
      if (!response.ok) throw new Error(`${path}: ${response.status}`);
      const name = path.slice(prefix.length);
      // npm does not publish `.gitignore`: the creator renames it, and so does the sandbox.
      return [name === 'gitignore' ? '.gitignore' : name, await response.text()] as const;
    }),
  );
  return Object.fromEntries(entries);
};

const project = (template: Template, version: string, files: Record<string, string>): Project => ({
  title: `Harmonix plugin (${template})`,
  description: `npm create ${PACKAGE.replace('/create-', '/')}@${version} my-plugin -- --template ${template}`,
  template: 'node',
  files,
});

type Status = { state: 'idle' } | { state: 'loading' } | { state: 'ready'; version: string } | { state: 'error'; message: string };

const RELOADED = 'harmonix-sandbox-reloaded';

/**
 * Whether the page is cross-origin isolated. The server only sends the headers on a full load of
 * /sandbox, so arriving through the site's client-side navigation reloads the page once. If it is
 * still not isolated (another server, an old browser), the sandbox opens in a new tab instead.
 */
const useCrossOriginIsolation = () => {
  const [isolated, setIsolated] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    let reloaded = false;
    try {
      reloaded = sessionStorage.getItem(RELOADED) === '1';
      if (window.crossOriginIsolated) sessionStorage.removeItem(RELOADED);
      else if (!reloaded) sessionStorage.setItem(RELOADED, '1');
    } catch {
      reloaded = true; // Without sessionStorage, do not risk a reload loop.
    }
    if (window.crossOriginIsolated) setIsolated(true);
    else if (!reloaded) window.location.reload();
    else setIsolated(false);
  }, []);
  return isolated;
};

export const Sandbox = () => {
  const [template, setTemplate] = useState<Template>('react');
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const host = useRef<HTMLDivElement>(null);
  const isolated = useCrossOriginIsolation();
  const started = status.state !== 'idle';

  useEffect(() => {
    if (!started || !host.current) return;
    let cancelled = false;
    const target = document.createElement('div');
    host.current.replaceChildren(target);
    setStatus({ state: 'loading' });
    (async () => {
      try {
        const version = await latestVersion();
        const files = await templateFiles(version, template);
        if (cancelled) return;
        await sdk.embedProject(target, project(template, version, files), {
          height: 720,
          openFile: TEMPLATES.find((t) => t.id === template)?.open,
          view: 'default',
          theme: 'dark',
          startScript: 'dev',
          terminalHeight: 30,
          // StackBlitz only runs Node in an embed when the page is cross-origin isolated (COOP + COEP
          // headers on /sandbox). Without them, the editor loads but the preview cannot start.
          crossOriginIsolated: true,
        });
        if (!cancelled) setStatus({ state: 'ready', version });
      } catch (error) {
        if (!cancelled) setStatus({ state: 'error', message: error instanceof Error ? error.message : String(error) });
      }
    })();
    return () => {
      cancelled = true;
    };
    // Re-create the project when the template changes, once the visitor has started it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, started]);

  const openInNewTab = async () => {
    const version = await latestVersion();
    sdk.openProject(project(template, version, await templateFiles(version, template)), {
      openFile: TEMPLATES.find((t) => t.id === template)?.open,
      startScript: 'dev',
      newWindow: true,
    });
  };

  return (
    <div className={styles.sandbox}>
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label={translate({ id: 'sandbox.frameworks', message: 'Framework' })}>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={template === t.id}
              className={clsx(styles.tab, template === t.id && styles.tabActive)}
              onClick={() => setTemplate(t.id)}
            >
              <img src={t.logo} alt="" width={18} height={18} />
              {t.label}
            </button>
          ))}
        </div>
        <code className={styles.command}>npm create @uxland/harmonix-plugin@latest my-plugin -- --template {template}</code>
        <button type="button" className={styles.secondary} onClick={openInNewTab}>
          <Translate id="sandbox.newTab">Obrir a StackBlitz</Translate>
        </button>
      </div>

      <div className={styles.frame}>
        {!started && (
          <div className={styles.placeholder}>
            <p className={styles.placeholderTitle}>
              <Translate id="sandbox.placeholder.title">El projecte que genera el creador, en marxa al navegador</Translate>
            </p>
            <p className={styles.placeholderText}>
              <Translate id="sandbox.placeholder.text">
                StackBlitz instal·la les dependències i executa npm run dev: veuràs el codi, el terminal i el plugin dins del shell de demostració. Pots editar-lo; no es desa enlloc. Triga uns segons la primera vegada.
              </Translate>
            </p>
            {isolated === false ? (
              <>
                <p className={styles.placeholderText}>
                  <Translate id="sandbox.notIsolated">
                    Aquí no es pot executar dins de la pàgina, però el pots obrir a StackBlitz en una pestanya nova.
                  </Translate>
                </p>
                <button type="button" className={styles.primary} onClick={openInNewTab}>
                  <Translate id="sandbox.newTab">Obrir a StackBlitz</Translate>
                </button>
              </>
            ) : (
              <button type="button" className={styles.primary} disabled={!isolated} onClick={() => setStatus({ state: 'loading' })}>
                <Translate id="sandbox.start">Obrir el sandbox</Translate>
              </button>
            )}
          </div>
        )}
        <div ref={host} className={clsx(styles.embed, !started && styles.hidden)} />
        {status.state === 'loading' && (
          <p className={styles.status} role="status">
            <Translate id="sandbox.loading">Preparant el projecte…</Translate>
          </p>
        )}
        {status.state === 'error' && (
          <p className={styles.error} role="alert">
            <Translate id="sandbox.error" values={{ message: status.message }}>
              {"No s'ha pogut carregar el projecte ({message}). Torna-ho a provar o crea'l en local amb npm create."}
            </Translate>
          </p>
        )}
      </div>

      {status.state === 'ready' && (
        <p className={styles.version}>
          <Translate id="sandbox.version" values={{ version: status.version }}>
            {'Plantilla de @uxland/create-harmonix-plugin {version}.'}
          </Translate>
        </p>
      )}
    </div>
  );
};
