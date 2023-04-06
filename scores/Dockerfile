FROM maven:3.8.3-openjdk-17 AS build
WORKDIR scores
COPY pom.xml .
RUN mvn dependency:resolve
COPY . .
RUN mvn -DskipTests package

FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY --from=build scores/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]