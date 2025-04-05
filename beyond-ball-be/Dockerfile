# BUILD
FROM maven:3.8-openjdk-17 AS build
RUN mkdir -p /beyond-ball-app
WORKDIR /beyond-ball-app
COPY pom.xml /beyond-ball-app
COPY src /beyond-ball-app/src
RUN mvn clean package -DskipTests

# RUN
FROM openjdk:17
COPY --from=build /beyond-ball-app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]