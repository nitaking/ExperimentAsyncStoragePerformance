import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import * as marky from "marky";
import faker from "faker";
import * as KeyValueStore from "./src/key-value-store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 48,
      paddingBottom: 48,
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "System"
  },
});

const setMultiKeyValue1 = async () => {
  await KeyValueStore.save("name1", faker.name.findName());
};

const setObjectValue1 = async () => {
  const value = {
    name: faker.name.findName()
  };
  await KeyValueStore.save("@user1", JSON.stringify(value));
};

const setMultiKeyValue2 = async () => {
  await KeyValueStore.save("name2", faker.name.findName());
  await KeyValueStore.save("age2", String(faker.random.number()));
};

const setObjectValue2 = async () => {
  const value = {
    name: faker.name.findName(),
    age: faker.random.number()
  };
  await KeyValueStore.save("@user2", JSON.stringify(value));
};
const setMultiKeyValue3 = async () => {
  await KeyValueStore.save("name3", faker.name.findName());
  await KeyValueStore.save("age3", String(faker.random.number()));
  await KeyValueStore.save("token3", faker.random.uuid());
};

const setObjectValue3 = async () => {
  const value = {
    name: faker.name.findName(),
    age: faker.random.number(),
    token: faker.random.uuid()
  };
  await KeyValueStore.save("@user3", JSON.stringify(value));
};

const getMultiKeyValue1 = async () => {
  await KeyValueStore.get("name1");
};

const getObjectValue1 = async () => {
  const value = {
    name: faker.name.findName()
  };
  await KeyValueStore.get("@user1");
};

const getMultiKeyValue2 = async () => {
  await KeyValueStore.get("name2");
  await KeyValueStore.get("age2");
};

const getObjectValue2 = async () => {
  const value = {
    name: faker.name.findName(),
    age: faker.random.number()
  };
  await KeyValueStore.get("@user2");
};
const getMultiKeyValue3 = async () => {
  await KeyValueStore.get("name3");
  await KeyValueStore.get("age3");
  await KeyValueStore.get("token3");
};

const getObjectValue3 = async () => {
  const value = {
    name: faker.name.findName(),
    age: faker.random.number(),
    token: faker.random.uuid()
  };
  await KeyValueStore.get("@user3");
};

const format = object => {
  return {
    name: object.name,
    duration: object.duration
  };
};

export default function App() {
  const [resultSet, setResultSet] = React.useState([]);
  const [resultGet, setResultGet] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const startSet = async () => {
    let entry = null;

    marky.mark("<write>object");
    await setObjectValue1();
    entry = marky.stop("<write>object");
    resultSet.push(format(entry));

    marky.mark("<write>key-value");
    await setMultiKeyValue1();
    entry = marky.stop("<write>key-value");
    resultSet.push(format(entry));

    marky.mark("<write>object");
    await setObjectValue1();
    entry = marky.stop("<write>object");
    resultSet.push(format(entry));

    marky.mark("<write>key-value");
    await setMultiKeyValue1();
    entry = marky.stop("<write>key-value");
    resultSet.push(format(entry));

    marky.mark("<write>key-value2");
    await setMultiKeyValue2();
    entry = marky.stop("<write>key-value2");
    resultSet.push(format(entry));

    marky.mark("<write>object2");
    await setObjectValue2();
    entry = marky.stop("<write>object2");
    resultSet.push(format(entry));

    marky.mark("<write>key-value3");
    await setMultiKeyValue3();
    entry = marky.stop("<write>key-value3");
    resultSet.push(format(entry));

    marky.mark("<write>object3");
    await setObjectValue3();
    entry = marky.stop("<write>object3");
    resultSet.push(format(entry));

    alert(JSON.stringify(resultSet));
    setShow(false);
    setShow(true);
      resultSet.push({});
  };

  const startGet = async () => {
    let entry = null;

    marky.mark("<read>object");
    await getObjectValue1();
    entry = marky.stop("<read>object");
    resultGet.push(format(entry));

    marky.mark("<read>key-value");
    await getMultiKeyValue1();
    entry = marky.stop("<read>key-value");
    resultGet.push(format(entry));

    marky.mark("<read>object");
    await getObjectValue1();
    entry = marky.stop("<read>object");
    resultGet.push(format(entry));

    marky.mark("<read>key-value");
    await getMultiKeyValue1();
    entry = marky.stop("<read>key-value");
    resultGet.push(format(entry));

    marky.mark("<read>key-value2");
    await getMultiKeyValue2();
    entry = marky.stop("<read>key-value2");
    resultGet.push(format(entry));

    marky.mark("<read>object2");
    await getObjectValue2();
    entry = marky.stop("<read>object2");
    resultGet.push(format(entry));

    marky.mark("<read>key-value3");
    await getMultiKeyValue3();
    entry = marky.stop("<read>key-value3");
    resultGet.push(format(entry));

    marky.mark("<read>object3");
    await getObjectValue3();
    entry = marky.stop("<read>object3");
    resultGet.push(format(entry));

    alert(JSON.stringify(resultGet));
    setShow(false);
    setShow(true);
    console.log(resultSet, resultGet);
      resultGet.push({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Experiment</Text>
      <Text style={styles.title}>AsyncStorage</Text>
      <Text style={styles.title}>Performance</Text>
      <Button color={"blue"} title="計測 set" onPress={() => startSet()}></Button>
      <Button color={"blue"} title="計測 get" onPress={() => startGet()}></Button>

      {show &&
        resultSet.map((data, idx) => (
          <Text key={data.name + idx}>{JSON.stringify(data)}</Text>
        ))}
      {show &&
        resultGet.map((data, idx) => (
          <Text key={data.name + idx}>{JSON.stringify(data)}</Text>
        ))}
    </View>
  );
}
