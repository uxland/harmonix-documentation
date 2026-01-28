---
sidebar_position: 2
---

# Features

# Main Features

1. **Independent Development:** Development teams can work independently on different plugins, which allows for greater agility and facilitates the implementation of changes and new features.
2. **Scalability:** The plugin-based modular architecture facilitates horizontal scalability, as each plugin can be scaled separately. This is particularly beneficial in environments where certain parts of the user interface may experience higher load than others.
3. **Component Reusability:** User interface components can be reused in different parts of the application, which can lead to more efficient development and consistency in the appearance and behavior of the user interface.
4. **Heterogeneous Technology:** Teams can choose the most appropriate technologies for each plugin, which allows the use of different frameworks and libraries according to the specific requirements of each part of the user interface.
5. **Fault Resistance:** The modular plugin-based architecture can make the application more resistant to failures, as an error in one plugin will not necessarily affect the entire application.
6. **Interactivity:** Plugins can interact via commands and events between them, as well as with the services provided by the shell (modals, translations, business events, etc.)
7. **Authentication and security**: The system provides an http client to more easily manage authentication, preserve and refresh the session, and preserve security and avoid data cross-contamination errors.
8. **Improves User Experience:** By allowing incremental and rapid updates in specific parts of the user interface, the user experience can be improved by introducing new features or fixing issues more quickly.

<br/>

# Concepts

1. **Harmonix Engine**: The "core" of the framework, responsible for initializing the application and all plugins, and providing them with special capabilities to be self-contained within a shell.
2. **Plugin**: A plugin is an independent part of the system that contains everything necessary to execute a specific part of the application's functionality. Plugins are reusable and can be interchanged between different systems or applications.
3. **Shell:** It is a skeleton formed by different regions on which developers can build and inject their plugins.
4. **Region:** It is a defined space in the shell where different views defined by plugins can be injected. Regions can have different characteristics such as the ability to display one or more views simultaneously, as well as different adapters that alter their behavior.
5. **View:** It is the instance of a component or set of components that on their own have a functional meaning. Views are injected into the different regions of the shell.
6. **Sandbox.** It is a secure and isolated application for developing and testing plugins independently, separate from other modules. It operates as an application without plugins that mimics the actual Workstation application. It is part of the solution's development tooling.
7. **SDK (Software Development Kit)**: This is a set of tools that allows developers to create plugins and be able to integrate with the system, as well as interact with it and other plugins, if needed.
8. **Plugin Store**: It is the place where all available plugins are published and stored for use. It functions as a repository of compiled bundles from which the application will obtain the necessary ones to compose the UI.



![](https://t9012015559.p.clickup-attachments.com/t9012015559/60d2fe59-dd78-406e-8701-cea5bdc2d40f/image.png)


<br/>

# Benefits and advantages over other approaches or tools

*   With the plugin and region-based system, it is possible for 1 single plugin to inject **multiple views** into **multiple regions** of the container application (shell). With an iframe-based microfrontend system, you need to have a single URL per component to inject.
*   Systems like Webpack Model Federation, Single SPA or other tools are designed for **conventional Microfrontends**, where each part of the application is a microfrontend. In complex workstations, different parts of the application can be composed from **many different initiatives and verticals**, even mixed, filtered, and complex functional needs that these tools cannot solve.
*   The iframe needs a **web server** to serve the HTML and JS. With our solution, the **Plugin Store** would serve the compiled code as an object repository, avoiding the need for verticals to have a web server (drastic reduction in infrastructure and CI/CD costs)
*   The iframe can generate **CORS problems** and requires knowledge on the part of the module developer provider, infrastructure knowledge to solve possible network problems.
*   The framework implements a **cross-module communication** system, application-plugin, reusable, that does not require implementation by the plugin developer.
    *   Allows establishing a clear contract between pieces and increases the possibilities of more **transparent** app-plugin interaction.
    *   Example use cases (calling a snackbar, using a UI component like a busy), etc
*   The Plugin Store encapsulates the **governance complexity** of plugin permissions.
*   **Share common libraries** between plugins, such as the Design System or JS libraries like React, Vue, Lit... (**reduction in application weight**)
*   Facilitates plugin development by providing an **easily installable**, updatable and testable **sandbox**. In the case of the iframe, you would have to wait to do tests in a pre-production test environment.
*   Provides **clear documentation** for plugin development and, consequently, a clear definition of the workflow.


<br/>

# Technologies compatible with Harmonix

Harmonix is a dynamic plugin injection system, where these plugins can have N components/views injected into N regions. Each of these components must be a [standard Web Component](https://developer.mozilla.org/es/docs/Web/API/Web_components).

**Web Components** are established in the Javascript frontend ecosystem and are a good solution for applications based on Harmonix, as they encapsulate styles and rendering logic so that there are no collisions with other components and plugins.

Therefore, when creating a plugin, each of the created components must always be encapsulated with whatever technology, in a Web Component. Therefore, we could say that **Harmonix is compatible with any Javascript rendering library/framework that is capable of ultimately creating a Web Component**.

There are several ways to encapsulate a component from a Javascript library, and from the Harmonix development team, we work to provide the **most optimal solution** for each case. Currently, the frameworks that have been tested and documented are: **Vanilla JS** (native Javascript without library), **Lit 3**, **Angular 18** and **React 19**. As Harmonix consumers need others like Vue, etc., we will provide support and documentation.
