import React from "react";
import Header from "./HeaderNotify";
import CardGrid from "./CardGrid";

export default function ListMapper(props) {
  return props.collection.length ? (
    props.collection.map((item, i) => <CardGrid images={item.images} key={i} />)
  ) : (
    <Header title={props.view} />
  );
}
