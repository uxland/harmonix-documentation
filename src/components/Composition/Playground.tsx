import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { MiniShell } from './MiniShell';
import { FRAMEWORKS, usePlugins } from './plugins';
import styles from './styles.module.css';

/**
 * "Compose your application": the visitor switches plugins on and off and sees the shell
 * recompose itself, and the list that the shell gives to `bootstrapPlugins`.
 */
const ORDER = ['orders', 'insights', 'help', 'alerts', 'profile'];

const REGION_NAMES = {
  header: () => translate({ id: 'playground.region.header', message: 'capçalera' }),
  menu: () => translate({ id: 'playground.region.menu', message: 'menú' }),
  main: () => translate({ id: 'playground.region.main', message: 'contingut' }),
};

export const Playground = () => {
  const plugins = usePlugins();
  const [enabled, setEnabled] = useState<string[]>(['orders', 'insights', 'alerts']);
  const [activeMain, setActiveMain] = useState<string>('orders');
  const [orders, setOrders] = useState(1);

  const toggle = (id: string) =>
    setEnabled((current) => (current.includes(id) ? current.filter((item) => item !== id) : ORDER.filter((item) => current.includes(item) || item === id)));

  const installed = ORDER.filter((id) => enabled.includes(id)).map((id) => plugins[id]);

  return (
    <div className={styles.playground}>
      <fieldset className={styles.toggles}>
        <legend>
          <Translate id="playground.legend">Tria quins plugins carrega l'aplicació:</Translate>
        </legend>
        {ORDER.map((id) => {
          const plugin = plugins[id];
          const framework = FRAMEWORKS[plugin.framework];
          const regions = plugin.regions.filter((region) => region !== 'menu' || !plugin.regions.includes('main'));
          return (
            <label key={id} className={styles.toggle} style={{ '--fw': framework.color } as React.CSSProperties}>
              <input type="checkbox" checked={enabled.includes(id)} onChange={() => toggle(id)} />
              <img src={framework.logo} alt={framework.label} width={22} height={22} />
              <span className={styles.toggleText}>
                {plugin.name}
                <small>
                  {plugin.team}, {framework.label}.{' '}
                  {plugin.regions.includes('main') ? (
                    <Translate id="playground.contributes.main">Una vista i un element al menú.</Translate>
                  ) : (
                    <Translate id="playground.contributes.region" values={{ region: regions.map((region) => REGION_NAMES[region]()).join(', ') }}>
                      {'Una vista a la {region}.'}
                    </Translate>
                  )}
                </small>
              </span>
              <span className={styles.switch} aria-hidden="true" />
            </label>
          );
        })}
      </fieldset>

      <div className={styles.preview}>
        <div className={styles.previewShell}>
          <MiniShell
            plugins={installed}
            activeMain={activeMain}
            onSelectMain={setActiveMain}
            orders={orders}
            onNewOrder={() => setOrders((count) => count + 1)}
            showRegions
          />
        </div>
        <pre className={styles.code} aria-label="bootstrapPlugins">
          <code>
            <span className={styles.kw}>await</span> bootstrapPlugins([{'\n'}
            {installed.map((plugin) => (
              <span className={styles.codeLine} key={plugin.id}>
                {'  { pluginId: '}
                <span className={styles.str}>"{plugin.id}"</span>
                {', importer: () => '}
                <span className={styles.kw}>import</span>(<span className={styles.str}>"{plugin.id}.js"</span>)
                {' },\n'}
              </span>
            ))}
            {']);'}
          </code>
        </pre>
      </div>
    </div>
  );
};
