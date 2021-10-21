import React from "react";
import { Grid, Image } from "semantic-ui-react";
import PropTypes from "prop-types";

export default function CardGrid({ images }) {
  return (
    <Grid.Column className="ui segment" textAlign="center">
      <Image
        src={
          images.length
            ? images[0].url
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSAtX2ePfoVlXYOUyBCnNDlMeworrE16jXRw&usqp=CAU"
        }
        height={160}
      />
    </Grid.Column>
  );
}

CardGrid.propTypes = {
  images: PropTypes.array,
};
