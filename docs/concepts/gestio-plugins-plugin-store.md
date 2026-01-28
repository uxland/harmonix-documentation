---
sidebar_position: 5
---

# Plugin Management with Plugin Store

# Introduction

Every Harmonix-based application needs a key piece to function, the Plugin Store.

The **Plugin Store** is a plugin repository that provides a set of functionalities to manage and orchestrate the dynamic composition of Harmonix applications, as well as the dynamic loading and updating of plugins.

<br/>


# Overview

*   It is a service that provides a way to dynamically supply plugins to a Harmonix instance. This allows real-time updates and the integration of new features without deploying the entire application.
*   It has a discovery service that returns a JSON listing all available plugins, including their metadata and locations. This JSON object serves as a registry for all the microfrontends (plugins) that the Harmonix instance can load.
*   When the Harmonix instance starts, it retrieves the plugin list from the specified URL and parses the JSON to obtain the details of each plugin, including its URL and version. Finally, the plugins are dynamically loaded into the application.

<br/>

# Functionalities

*   **Discovery service**. Service that provides the list of available plugins for the Harmonix instance and their location.
*   **User and provider management.** It will provide an administration panel that will allow the creation and administration of users and roles.
*   **Independent plugin deployment**. Through an API, providers will be able to deploy new versions of their plugins independently.
*   **Version control**. There will be an administration panel that will allow control of the version returned in the discovery service.
*   **Rules management**. It will allow the configuration of rules on the plugins returned in the deployment service, based on conditions (for example, user role).
*   **CDN.** Plugins will deploy their compiled files to the Plugin Store server so it serves the content, avoiding the need for plugins to require their own infrastructure.



**NOTE**: The Harmonix Framework does not have its own infrastructure and therefore, its own Plugin Store. Currently, each Harmonix-based application project must have a customized Plugin Store with its infrastructure and corresponding CI/CD, as well as its frontend and backend application to manage the specific roles and permissions of that project.
