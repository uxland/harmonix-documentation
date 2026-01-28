---
sidebar_position: 4
---

# Plugin Lifecycle

# Introduction

A plugin is a Node.js library/package that exports at least one `initialize` function that receives a plugin API to connect components to a Harmonix Shell instance that hosts it.

The lifecycle of a plugin exists in two different categories:

*   **Offline lifecycle**, that is, everything related to the development, maintenance and provisioning of a plugin.
*   **Online lifecycle**, that is, everything related to loading and evaluating a plugin within a shell application.

<br/>

# Offline Lifecycle

The offline lifecycle consists of:

1. Initialization/Structuring
2. Development and testing
3. Publication
4. Maintenance
5. Updates
6. Deprecation
7. Deactivation



While phases (1), (2) and (4) are purely local, phases (3), (5), (6) and (7) will involve the Plugin Store service. A Plugin Store service should support all these actions. Normally, phase (3) can also involve a progressive deployment, which would mean starting with only a subset of users until the plugin reaches the desired maturity level.


<br/>

# Online Lifecycle

The online lifecycle describes what happens when a plugin needs to be integrated into a shell application. We have:

1. Loading
2. Evaluation
3. Configuration
4. Rendering
5. Unmounting



In phase (1) a request is made to the Plugin Store service and the script is retrieved.

In phase (2) the script is evaluated.

In phase (3) the necessary configuration function will be executed. In the rendering phase (4) all registered components from phase (3) will appear in the application when needed.

In phase (5) the optional unmounting function will be executed.
