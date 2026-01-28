---
sidebar_position: 12
---

# Best practices

# Desconectar correctamente el plugin

En el ciclo de vida de un plugin, pasamos por 2 fases importantes; la **iniciación** (montaje) y la **desconexión** (desmontaje). Es importante que todo aquello que se haya hecho en el montaje del plugin (registrar vistas, suscribirse a eventos del broker de mensajes, crear contenedores de dependencias internos, etcétera), se **haga una desconexión limpia** para no dejar **ningún rastro en memoria** de tu plugin. Aunque, en la mayoría de los casos, el usuario cerrará el navegador y la aplicación de Primaria morirá en aquel instante, se pueden dar casos potenciales en que se hagan cosas como cambiar de paciente, renovar sesión, cambios de contexto, etcétera, que provoquen una nueva carga de plugins en caliente. Si no desconectamos bien nuestros plugins, podemos dejar en memoria piezas que pueden afectar el rendimiento **(memory leaks)**, o datos de otros pacientes **(mezcla de datos de pacientes)**.


<br/>

# Tratar la API que se recibe en el montaje como singleton

Cuando inicializamos un plugin, recibimos por parámetro el objeto API. Es importante no hacer muchos tratamientos en esta API, como clonar el objeto, añadir referencias innecesarias u otras malas prácticas. Debemos tratar este objeto API como un **singleton único** y que será la fuente de la verdad y las herramientas necesarias para trabajar. Una buena práctica sería crear un contenedor de dependencias (por ejemplo el que crea la librería **_inversify_**) y añadir la API como dependencia al contenedor para que pueda resolverla en cualquier punto de nuestro código en forma de singleton.

<br/>

# Utilizar la inicialización correctamente como punto de entrada e inicio del ciclo de vida de tu plugin

En la función "_initialize_" que se debe implementar, es un buen punto para hacer las primeras configuraciones necesarias de tu plugin, así como las primeras llamadas a servicios e inyección de vistas a regiones.

Ejemplo:

```typescript
export const initialize = async (api: PrimariaApi) => {
  registerViews(api); //registro de vistas a regiones
  await initializeLocalization(api); //inicialización de las traducciones del plugin
  bootstrapFeatures(api); //inicialización de los casos de uso del plugin
  return Promise.resolve();
};
```

<br/>

# No hacer un plugin por cada sitio donde queremos mostrar información

Hay que recordar que un plugin es una parte independiente del sistema capaz de resolver diferentes casos de uso de un mismo ámbito. Es importante entender que un plugin es capaz de inyectar diferentes vistas/web components a diferentes regiones del Shell, pero a la vez que los datos que se muestran en estos componentes vengan de la misma única fuente de datos.

Ejemplo:

Si tenemos un plugin de alergias del paciente, en el caso de Salud, y necesitamos mostrar 3 vistas diferentes (un listado de alergias en la vista principal, un contador de alergias en la cabecera y un botón para añadir una en el menú de acciones), no es necesario y de hecho **NO RECOMENDABLE**, crear 3 plugins.

Crear 3 plugins implicaría triplicar mucho código y tener el ciclo de vida independiente cuando en realidad se está tratando el mismo ámbito. Con 1 solo plugin y 1 solo backend de alergias, se gestionarán los datos de forma que habrá una única fuente de la verdad que alimentará estos 3 componentes inyectados en 3 regiones diferentes del Shell.


<br/>

# Prefijar las vistas de un plugin con el id del plugin

Para que 2 plugins de 2 iniciativas diferentes no colisionen, creando una vista con el mismo id (header-view, main-view) por ejemplo, es recomendable prefijar los id's de las vistas a inyectar con el pluginId que llega siempre a la función "initialize".

Ejemplo:

```typescript
const pluginId = api.pluginInfo.pluginId;

api.regionManager.registerMainView({
    id: `${pluginId}-main-view`,
    factory: mainFactory
  },);
```


<br/>

# Gestión de assets estáticos

Cada plugin debe ser responsable de resolver los assets estáticos como imágenes, fuentes, etcétera. El modelo Harmonix no es una aplicación convencional en la que se dispone de una carpeta public con los estáticos, ya que el shell no conoce la implementación de las iniciativas que realizarán plugins.

Por lo tanto se recomienda que imágenes, iconos, fuentes, etcétera estén en el plugin en formato código, o sea el plugin quien cree una infraestructura propia donde alojar estos assets y consumirlos según le convenga.


<br/>

# Desconectar correctamente el plugin

En el ciclo de vida de un plugin, pasamos por 2 fases importantes; la **iniciación** (montaje) y la **desconexión** (desmontaje). Es importante que todo aquello que se haya hecho en el montaje del plugin (registrar vistas, suscribirse a eventos del broker de mensajes, crear contenedores de dependencias internos, etcétera), se **haga una desconexión limpia** para no dejar **ningún rastro en memoria** de tu plugin. Aunque, en la mayoría de los casos, el usuario cerrará el navegador y la aplicación de Primaria morirá en aquel instante, se pueden dar casos potenciales en que se hagan cosas como cambiar de paciente, renovar sesión, cambios de contexto, etcétera, que provoquen una nueva carga de plugins en caliente. Si no desconectamos bien nuestros plugins, podemos dejar en memoria piezas que pueden afectar el rendimiento **(memory leaks)**, o datos de otros pacientes **(mezcla de datos de pacientes)**.
