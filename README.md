# Saas seeder project

This base project has all the configurations to get you up and running on Magnolia Saas and Next JS fast!

It's basically a skelton which allows you to develop your own app on.
There are two things you need to configure to get up and running.

1. Set you subscription ID in a environment file.
2. Set the BaseURL of the project.

**Subscription** **ID**

The Subscription ID is found on you instance of Magnolia Saas. Here is a link to help you find it. [Find my SubId.](https://docs.magnolia-cms.com/saas/faqs.html#_managing_your_subscription)

Once you have it paste to into the .env file as a value for the property `NEXT_APP_MGNL_SUB_ID.`

Something like this:

    NEXT_APP_MGNL_SUB_ID="lo2bbw********"

**BaseURL**

Now the BaseUrl this is based on the parent page you create in Magnolia. Here is an example of how to do this. [Make a parent page.](https://docs.magnolia-cms.com/saas/hello-saas/edit-react-app.html)

You'll select Standard Page as your template but of course you can change this as you add more pages and templates.

What ever is the _slug_ for your named page is what you paste into as you Base Url, you can see this in the as you type the page name.
Once you have it paste to into the .env file as a value for the property `NEXT_APP_MGNL_APP_BASE`.

Something like this:

    NEXT_APP_MGNL_APP_BASE=/my-first-page

Currently the `NEXT_APP_MGNL_APP_BASE` is set to `saas-demo` so as long as there's a root page in the the saas subscription associated with your subsciprion id name `saas-demo` you shuold be able to see something to start with.

That's it you should be able to follow the normal instructions and start developing!

Good luck.
