# followed-content

This is where you include your WebPart documentation.

## Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

## Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

## Ship Solution to App-Catalog

**You need to be in the project folder in order to execute the ```gulp``` commands**

1. Create an AppCatalog
2. Provide read access to all domain users of your company
3. Create a document library in the AppCatalog site
4. Create a folder withing the document library to host the JavaScript files
5. Adjust the ```config\write-manifes.json``` file in the following way:
   
   ```"cdnBasePath": "<Provide the url to the folder you created in step 4>"```

6. Execute the following command:
```bash
gulp bundle --ship
```

7. The minified assets can be found under the ```temp\deploy``` directory
8. Copy these files into the folder you created in step 4
9. Execute the following command:
```bash
gulp package-solution --ship
```
10. This creates the updated client-side solution package in the ```sharepoint\solution``` folder
11. Upload the solution to your AppCatalog

That is it. Now install the app to your site, and add the ```Followed Content``` Web Part to any page.

## Post install steps

1. You need to configure the ```My Site Host URL``` in the Web Part configuration.
2. You can also provide an alternative title.
