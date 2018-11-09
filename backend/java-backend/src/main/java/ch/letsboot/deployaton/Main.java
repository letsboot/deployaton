package ch.letsboot.deployaton;

import static spark.Spark.*;

public class Main {

    public static void main(String[] args) {
        port(8080);
        get("/name", (req, res) -> System.getenv("SPARK_NAME"));
    }

}
