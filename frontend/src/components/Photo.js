import React from "react";
import { Card, CardBody, CardImg, Button } from "reactstrap";

const Photo = ({ photo, toggle, handleDelete }) => {
  return (
    <Card className="my-2" color="light">
      <CardImg
        src={`data:${photo.contentType};base64, ${photo.data}`}
        alt={photo.title}
        style={{ height: "150px", objectFit: "cover" }}
        />
      <CardBody>
        <div className="d-flex gap-4 justify-content-center">
          <Button
            color="primary"
            onClick={() => toggle(photo.contentType, photo.data, photo.fileName)}
          >
            Visualizza
          </Button>
          <Button color="danger" onClick={() => handleDelete(photo.id)}>
            Elimina
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Photo;