# Magnetic  - The SaaS Website Demo 

## Overview

The “Magnetic” SaaS Website Demo is primarily a showcase for the high-level usecases that Magnolia SaaS can cover. 

Use Magnetic to learn about, and show people what Magnolia SaaS can do.

It is also a reference implementation to show implementors how to build and achieve key aspects of a project.

## Use cases

Magnolia customer use cases demonstrated in Magnetic:

- Corporate website
- Lead generating website
- Multiple brand websites with some shared content and shared components
- Simple product catalog  
- Blog / Articles (In development)

## The Magnetic Scenario

The scenario and all content is fiction. The imaginary Magnetic Group is a holding company/consolidator for watch brands. 

Magnetic has several lines of watches serving various customer types.

The demo has three websites:

- Magnetic - The holding company
- Rethink - A brand focussed on sustainability
- Franklin - A retro/steampunk brand

## Key capabilities and benefits demonstrated

### Authoring

- Visual Page Editing - for home page and other landing pages.
    - Component library for corporate sites.
- Content app - Structured content for products. (Rendered as product list & product pages)
- Multiple sites - Each using the same frontend code and components, and some content, but having a unique style.
- Authorable navigation - per site.
- SEO (In development)

### Technical

- Headless architecture
- Developer Experience: Efficient development with Livesync.
- Developer Experience: Environments.
- Draft (Preview)  and  Published content
- Jamstack: Static Site Generation via Next.js, Netlify/Vercel and Webhooks.
    - High performance website
    - High availability website

## Usage

There are two options: Use an existing installation, or create your own.

### Use an existing installation

Use Magnolia's hosted demo. Visit the public sites at: 

- [https://magnetic-saas.netlify.app/](https://magnetic-saas.netlify.app/)
- [https://rethink-saas.netlify.app/](https://rethink-saas.netlify.app/)
- [https://franklin-saas.netlify.app/](https://franklin-saas.netlify.app/)

Contact a Magnolia representative for a tour of the AdminCentral authoring interface.

### Create your own

This git repository is a Starter Kit for the Magnetic project. You can provision your SaaS subscription with it. See the Installation section below for details.

## Installation

Install Magnetic by following the same procedure as described in the [SaaS Getting Started tutorial](https://docs.magnolia-cms.com/saas/hello-saas.html).

Just use the contents of this magnetic-saas repository instead of the “hello-saas-tutorial” repository. ([https://github.com/magnolia-cms/magnetic-saas](https://github.com/magnolia-cms/magnetic-saas) ) 

Update the `NEXT_APP_MGNL_SUB_ID` variable in `.env` to your SaaS Subscription ID. 

Update the `NEXT_PUBLIC_MGNL_APP_BASE` variable in `.env.local` to the site you want to edit.


This repository contains all three key ingredients for a Magnolia SaaS Starter Kit: A frontend project, the CMS configuration, and sample content (including pages, products and images).

# Technical Details

## Multisite

In this project, the desire is to power multiple sites from the same frontend code-base. (Another pattern is to have each site using a different frontend code-base.)

A key challenge is to have each frontend pull only from the content of one root page and its children in the Pages App. For example, the Rethink site should get content from the “/rethink” node.

This is accomplished using environment variables. 

### Multisite - Local

When running for local development of the frontend be sure to set `NEXT_PUBLIC_MGNL_APP_BASE`  to the root node in the Pages app, for example to `/rethink`. (See the .env.local file) 

Then visiting [`http://localhost:3000/`](http://localhost:3000/) will load the “/rethink” page. 

However it will not be possible to browse or edit the “/magnetic” or “/franklin” sites, those pages will not render in the Page Editor.

(There are techniques to make all root nodes editable at the same time without setting env variable, but we feel the current approach is a best practice. Authors will be able to edit all the pages, this limitation is only for developers during local development.)

### Multisite - Hosted

In order to host the public sites, create 3 separate sites on your hosting platform (like Netlify or Vercel) and configure the `NEXT_PUBLIC_MGNL_APP_BASE` for each of them. (/magnetic, /rethink, and /franklin)

Be sure that `NEXT_PUBLIC_MGNL_APP_BASE` is not set in the `.env` file in your git project, as it would override the variable in the hosting platform. (You can handle this by setting the variable in the `.env.local` file which is not checked in.) 

### Style / CSS

Each site loads a different CSS file based on the same environment variable or the path, and merges it with global styles. See `_app.js`.

## Next.JS and SSG

The project uses static site generation. This means that all of the sites pages are sitting on a CDN and will load very quickly, around the world. It also means that end-user requests will not hit the endpoints of the Magnolia subscriptions.

The project uses Next.js “Preview mode” to render a dynamic “on the fly” version of the page for an author when it is opened in the page editor.

Because it is a static site, the site must be rebuilt when content is changed. This is done via a Magnolia webhook whenever content is published.

See the `light-modules/saas-demo/webhooks` directory.

## Product Pages - Using Content-Types Only

There are two routes which demonstrate consuming content from the Content-Type-Based-App "Watches", without using the Pages App at all.

- *Product List*: /ct-only Displays all of the watches under the root folder with the name stored in `NEXT_PUBLIC_MGNL_APP_BASE` (Typically  /rethink, or /franklin)
- *Product Detail*: /watches/[Path of watch] ie : http://localhost:3000/watches/Trifecta

Note: To be clear - this feature depends on the name of the root folder in the `Watches` app to match the configured environment variable.