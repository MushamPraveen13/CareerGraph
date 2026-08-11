import neo4j from "neo4j-driver";

const uri = process.env.NEO4J_URI;
const username = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

if (!uri || !username || !password) {
  throw new Error(
    "Missing NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD environment variables."
  );
}

export const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);
