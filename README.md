This is a project for DISS

# How to run the app:

This app has Dockerfiles which means you can use Docker to run it.
You must have Docker installed. 

# DOCKER

To build the images run:
(will have to run this command every time you make a change)

`docker-compose up --build`

Tu run images already built:

`docker-compose up`

Docker can take a long time to build, so if you wanna run the 
projects locally you must have Node and Java installed

# BE

To run the BE separately you will have to start the Database docker container,
which you can do inside the Docker app, after you have build the images at least once.

The run the BE as normal from intelliJ.
Make sure you have clicked load!!! if you got a prompt to load Maven stuff, and
make sure to click on the prompt that asks to enable annotations!!! (we need those for Lombok)

(Lombok is a tool that allows us to not have to write setters, getters or constructors)

If annotations still don't work try to make sure you have these settings the same:

`Intellij > Settings > Build, Execution, Deployment > Compiler > Annotation Processors > Default`

Here click `"Enable annotation processing"`

And click the option `"Obtain processors from project classpath"`

Same for:

`Intellij > Settings > Build, Execution, Deployment > Compiler > Annotation Processors > Annotation profile for beyond-ball-be`

Before running, go to `Intelij > Run > Edit Configuration > Modify options > Environment variables checked > in the new box Environment variables enter: MAIL_USERNAME=beyondball.noreplay@gmail.com;MAIL_PASSWORD=znwz wpkk aoel dcvv` 

# FE

For the FE, you will need the node_modules, so run:

`npm install`

And then to run the app

`npm run dev`

This should open the app at [http://localhost:3000](http://localhost:3000) which can be opened in the browser
