---
sidebar_position: 3
---

# Workflow

Harmonix has been created to build applications where the **development experience** becomes a key point, so developer comfort is a priority.



This is achieved thanks to **plugin development autonomy**, together with the set of **simple and standard** configuration tools.



The **development workflow** goes through a **first phase of creating the Shell** based on Harmonix, where the main regions are declared and the necessary tools are configured until the application becomes a "**plugin factory**" state. It is then when developers can start creating plugins with the provided sandbox that will end up in this Shell.



Plugins are **compiled and deployed to the Plugin Store**, and from there control will be maintained over the versions of each plugin and the necessary roles and permissions will be configured. Finally, the application with the Harmonix engine will obtain these plugins and will **execute them asynchronously**, thus building the final application.

Below, the **execution flow** of a Harmonix application is detailed:



0- The user opens the application in the Browser at the corresponding domain

1- The shell, through Harmonix, creates the skeleton, the API object and starts the main process of obtaining plugins

2- The files of each plugin published to the Plugin Store are downloaded

3- The initialization function of each plugin is called in parallel

4- Each plugin performs the tasks it has defined at its initialization point

5- The UI is composed as plugin component registrations are resolved

7- The user finally sees a single application composed of different plugins and Web Components and can interact with it.
