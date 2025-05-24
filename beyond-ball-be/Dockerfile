# Build stage (shared)
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Development stage
FROM maven:3.8-openjdk-17 AS dev
WORKDIR /app
COPY . .
EXPOSE 8080
CMD ["mvn", "spring-boot:run"]

# Production stage
FROM openjdk:17-jdk-slim AS prod
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# docker buildx build --platform linux/amd64 --target prod -t katie493/beyond-ball-be:latest --push .