import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import { type ExamplePlugin, FRAMEWORKS, type Region } from './plugins';
import styles from './styles.module.css';

/**
 * A small drawing of a Harmonix application: a shell with three regions (header, side menu and
 * main) and the views that the plugins have injected into them. It is shared by the animated hero
 * and by the playground, which decide what is in it.
 */
export interface MiniShellProps {
  plugins: ExamplePlugin[];
  /** The plugin whose main view is shown. */
  activeMain?: string;
  onSelectMain?: (id: string) => void;
  /** Orders created: the broker carries them from the Orders view to the alerts and the chart. */
  orders: number;
  /** The region that has just received a view, to highlight it for a moment. */
  landing?: Region;
  /** Highlights the "new order" button, as if it had been pressed. */
  pressing?: boolean;
  /** Shows the region outlines and names. */
  showRegions?: boolean;
  /** The menu item the pointer is about to click. */
  pointing?: string;
  /** Makes "new order" a real button. */
  onNewOrder?: () => void;
}

const FrameworkTag = ({ plugin }: { plugin: ExamplePlugin }) => {
  const framework = FRAMEWORKS[plugin.framework];
  return (
    <span className={styles.tag} style={{ '--fw': framework.color } as React.CSSProperties}>
      <img src={framework.logo} alt="" width={12} height={12} />
      {framework.label}
    </span>
  );
};

const RegionName = ({ children }: { children: React.ReactNode }) => <span className={styles.regionName}>{children}</span>;

const OrdersView = ({
  plugin,
  orders,
  pressing,
  onNewOrder,
}: { plugin: ExamplePlugin; orders: number; pressing?: boolean; onNewOrder?: () => void }) => (
  <div className={styles.view} style={{ '--fw': FRAMEWORKS[plugin.framework].color } as React.CSSProperties}>
    <div className={styles.viewHead}>
      <strong>{plugin.name}</strong>
      <FrameworkTag plugin={plugin} />
    </div>
    <ul className={styles.rows}>
      {Array.from({ length: Math.min(3 + orders, 6) }, (_, i) => (
        <li key={i} className={clsx(i >= 3 && styles.rowNew)}>
          <span>#{1024 + i}</span>
          <i style={{ width: `${40 + ((i * 23) % 45)}%` }} />
        </li>
      ))}
    </ul>
    {React.createElement(
      onNewOrder ? 'button' : 'span',
      {
        className: clsx(styles.action, pressing && styles.actionPressed),
        'data-broker-source': true,
        ...(onNewOrder && { type: 'button', onClick: onNewOrder }),
      },
      <Translate id="composition.orders.new">Nova comanda</Translate>,
    )}
  </div>
);

const BARS = [38, 62, 45, 70, 54];

const InsightsView = ({ plugin, orders }: { plugin: ExamplePlugin; orders: number }) => (
  <div className={styles.view} style={{ '--fw': FRAMEWORKS[plugin.framework].color } as React.CSSProperties}>
    <div className={styles.viewHead}>
      <strong>{plugin.name}</strong>
      <FrameworkTag plugin={plugin} />
    </div>
    <div className={styles.chart}>
      {BARS.map((height, i) => (
        <i key={i} style={{ height: `${i === BARS.length - 1 ? Math.min(height + orders * 12, 96) : height}%` }} />
      ))}
    </div>
  </div>
);

const HelpView = ({ plugin }: { plugin: ExamplePlugin }) => (
  <div className={styles.view} style={{ '--fw': FRAMEWORKS[plugin.framework].color } as React.CSSProperties}>
    <div className={styles.viewHead}>
      <strong>{plugin.name}</strong>
      <FrameworkTag plugin={plugin} />
    </div>
    <ul className={styles.faq}>
      {[72, 58, 66].map((width, i) => (
        <li key={i}>
          <b>?</b>
          <i style={{ width: `${width}%` }} />
        </li>
      ))}
    </ul>
  </div>
);

interface MainViewProps {
  plugin: ExamplePlugin;
  orders: number;
  pressing?: boolean;
  onNewOrder?: () => void;
}

const MAIN_VIEWS: Record<string, React.FC<MainViewProps>> = {
  orders: OrdersView,
  insights: InsightsView,
  help: HelpView,
};

const MENU_ICONS: Record<string, string> = { orders: '▤', insights: '▥', help: '?' };

export const MiniShell = ({
  plugins,
  activeMain,
  onSelectMain,
  orders,
  landing,
  pressing,
  showRegions = true,
  pointing,
  onNewOrder,
}: MiniShellProps) => {
  const header = plugins.filter((plugin) => plugin.regions.includes('header'));
  const withMain = plugins.filter((plugin) => plugin.regions.includes('main'));
  const active = withMain.find((plugin) => plugin.id === activeMain) ?? withMain[0];
  const alerts = plugins.find((plugin) => plugin.id === 'alerts');
  const profile = plugins.find((plugin) => plugin.id === 'profile');

  return (
    <div className={clsx(styles.shell, showRegions && styles.showRegions)}>
      <div data-region="header" className={clsx(styles.header, styles.region, landing === 'header' && styles.landing)}>
        <span className={styles.brand}>
          <img src="/img/harmonixLogoNew.svg" alt="" width={16} height={16} />
          Harmonix
        </span>
        <span className={styles.headerViews}>
          {alerts && (
            <span className={clsx(styles.headerView, styles.enter)} title={alerts.name}>
              <span className={styles.bell} aria-hidden="true">
                ◔
              </span>
              <span className={styles.badge} key={orders} data-broker-target>
                {orders}
              </span>
              <FrameworkTag plugin={alerts} />
            </span>
          )}
          {profile && (
            <span className={clsx(styles.headerView, styles.enter)} title={profile.name}>
              <span className={styles.avatar} aria-hidden="true">
                AL
              </span>
              <FrameworkTag plugin={profile} />
            </span>
          )}
        </span>
        {!header.length && <RegionName>header</RegionName>}
      </div>

      <div data-region="menu" className={clsx(styles.menu, styles.region, landing === 'menu' && styles.landing)}>
        {withMain.map((plugin) => {
          const item = (
            <>
              <span className={styles.menuIcon} aria-hidden="true">
                {MENU_ICONS[plugin.id]}
              </span>
              {plugin.name}
            </>
          );
          const className = clsx(
            styles.menuItem,
            styles.enter,
            plugin.id === active?.id && styles.menuActive,
            plugin.id === pointing && styles.menuPointing,
          );
          return onSelectMain ? (
            <button key={plugin.id} data-menu={plugin.id} type="button" className={className} onClick={() => onSelectMain(plugin.id)} aria-pressed={plugin.id === active?.id}>
              {item}
            </button>
          ) : (
            <span key={plugin.id} data-menu={plugin.id} className={className}>
              {item}
            </span>
          );
        })}
        {!withMain.length && <RegionName>side menu</RegionName>}
      </div>

      <div data-region="main" className={clsx(styles.main, styles.region, landing === 'main' && styles.landing)}>
        {active ? (
          <div className={styles.enter} key={active.id}>
            {(() => {
              const View = MAIN_VIEWS[active.id];
              return <View plugin={active} orders={orders} pressing={pressing} onNewOrder={onNewOrder} />;
            })()}
          </div>
        ) : (
          <RegionName>main</RegionName>
        )}
      </div>
    </div>
  );
};
