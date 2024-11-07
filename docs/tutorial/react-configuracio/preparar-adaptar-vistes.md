---
sidebar_position: 10
---

# 10- Preparar i adaptar les vistes

Un pas previ i molt important abans de poder injectar el plugin a les regions, és la creació dels 3 arxius que haurà de tenir cada carpeta per a la seva vista corresponent. Com s'ha mostrat anteriorment, en aquest exemple tenim dues vistes (_header_ i _main_). Per a cada vista, dins de la seva corresponent carpeta hi crearem un arxiu `factory.ts`, un `styles.css` i un `view.tsx`.

  

L'arxiu `factory.ts` declara la funciona de factoria de creació de vista.

L'arxiu `view.tsx` declara el component arrel de la vista.

L'arxiu `styles.css` declara tots els estils dels components de la vista.

  

El _"@uxland/primary-shell"_ conté una funció de utilitat _wrapReactViewFactory_ que facilita la creació de factories de vistes de components funcionals React, embolcallant el component de React amb els estils en un WebComponent.

  

En el cas del HeaderView crearíem el arxiu `factory.ts` :

  

```javascript
import { wrapReactViewFactory } from "@uxland/primary-shell";
import styles from "./styles.css?inline";
import { HeaderView } from "./view";

export const headerFactory = wrapReactViewFactory(HeaderView, styles);
```

  

L'arxiu `view.tsx` amb el component funcional de react de la vista:

```typescript
export const HeaderView = () => {
  return (
      <div>
        <div className="title">
            React Harmonix plugin
        </div>
      </div>
  );
}
```

  

I l'arxiu `styles.css` doncs serà l'estil que li apliquem a la nostre vista:

  

```css
.title {
    color: purple;
    background: orange;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid purple;
}
  
```

  

Important: en els casos en que el component que fa de vista tingui internament altres components fills, s'haurà d'importar expressament els estils dels components dels fills per a un correcte funcionament.

  

Per exemple, en el cas d'una de les vistes d'aquest exemple (_MainView_), el component _MainView_ es veu així, en el que internament té el component fill _CounterButton_:

  

```typescript
import React from 'react';
import {CounterButton} from "../../components/counter-button/counter-button";

export const MainView = () => {

const [count, setCount] = React.useState(0);
const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);

  return (
    <>
      <h1>React Harmonix plugin</h1>
      <h2>Contador: {count}</h2>
      <CounterButton onClick={increment}>Incrementar</CounterButton>
      <CounterButton onClick={decrement}>Decrementar</CounterButton>
      <h1>¡Hola, mundo!</h1>
      <p>Este es un componente funcional básico en React dentro de un Web Component.</p>
    </>
  );
};
```

  

Això significa que el seu corresponent arxiu `styles.css` a més a més d'incloure els propis estils del component pare (_MainView_), també hagi d'importar directament els estils del component fill (_CounterButton_):

  

```css
@import "../../components/counter-button/counter-button.css";

h1{
    color: blue;
}
```

I el seu corresponent arxiu `factory.ts` queda així:

```typescript
import { wrapReactViewFactory } from "@uxland/primary-shell";
import { MainView } from "./view";
import styles from "./styles.css?inline";

export const mainFactory = wrapReactViewFactory(MainView, styles);
```

  

El component _CounterButton_ esmentat, tindria el seu arxiu `counter-button.tsx` següent:

```typescript
import react, { ReactNode } from "react";
export const CounterButton: react.FC<{children: ReactNode, onClick: () => void}> = ({children, onClick}) => {
      return (
        <button className="btn-counter" onClick={onClick}>
            {children}
        </button>
      );
    };
```

I el seu arxiu d'estils `counter-button.css` següent:

```css
.btn-counter {
    background-color: #6a0dad;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.1s;
    margin: 10px;
  }
  
  .btn-counter:hover {
    background-color: #8a2be2; 
  }
  
  .btn-counter:active {
    transform: scale(0.95);
    background-color: #5b0e94;
  }
```