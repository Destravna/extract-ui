/* eslint-disable no-unused-vars */
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AddExtract = () => {
  const [formData, setFormData] = useState({
    extractName: "",
    model: "",
    attributes: {
      allAttributes: false,
      attributesList: [], // Change attributesList to an array
    },
    dateFrom: "",
    dateTo: "",
    outputFormat: "",
    outputPath: "",
    deliveryFormat: "",
  });

  const [newAttribute, setNewAttribute] = useState({
    attributeName: "",
    alias: "",
    condition: "",
  });

  const attributeOptions = [
    "TradeDirection",
    "tradeType",
    "IsDestroyed",
    "redid",
    "comment",
    "tradeDate",
    "tradeValueDate",
    "lakeStorageTimeStamp",
    "modelVersion",
    "nominalAmount",
    "nominalCurrency",
    "quantity",
    "rawStorageTimeStamp",
    "sourceApplication",
    "tradeld",
    "version",
    "lastUpdateTimeStamp",
    "product",
    "product.productid",
    "Product.productName",
    "Product.maturity",
  ];

  const handleNewAttributeChange = (event) => {
    const { name, value } = event.target;
    setNewAttribute({ ...newAttribute, [name]: value });
  };

  const handleAddAttribute = () => {
    const newAttributeObject = {
      [newAttribute.attributeName]: {
        alias: newAttribute.alias,
        condition: newAttribute.condition,
      },
    };

    setFormData((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        attributesList: [...prevState.attributes.attributesList, newAttributeObject],
      },
    }));

    setNewAttribute({ attributeName: "", alias: "", condition: "" });
    console.log("attribute added", formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOutputFormatChange = (eventKey) => {
    setFormData({ ...formData, outputFormat: eventKey });
  };

  const handleAllAttributesChange = (eventKey) => {
    setFormData({
      ...formData,
      attributes: {
        ...formData.attributes,
        allAttributes: eventKey,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(formData);
    const jsonString = JSON.stringify(formData);
    console.log("json string");
    console.log(jsonString);

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/api/add-extract",
        headers: {
          "Content-Type": "application/json",
        },
        data: jsonString,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form  onSubmit={handleSubmit} style={{ padding: "10px" }}>
      <p>
        Extract name
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="extractName"
            value={formData.extractName}
            onChange={handleInputChange}
            placeholder="extract-name"
          />
        </Form.Group>
      </p>

      <p>
        Model
        <Dropdown
          onSelect={(eventKey) =>
            setFormData({ ...formData, model: eventKey })
          }
        >
          <Dropdown.Toggle variant="Secondary" id="dropdown-model">
            {formData.model || "Select Model"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="otc">OTC</Dropdown.Item>
            <Dropdown.Item eventKey="listed">Listed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </p>

      <p>
        Date From
        <Form.Group className="mb-3">
          <Form.Control
            type="date"
            name="dateFrom"
            value={formData.dateFrom}
            onChange={handleInputChange}
          />
        </Form.Group>
      </p>

      <p>
        Date To
        <Form.Group className="mb-3">
          <Form.Control
            type="date"
            name="dateTo"
            value={formData.dateTo}
            onChange={handleInputChange}
          />
        </Form.Group>
      </p>

      <p>
        Output Path
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="outputPath"
            value={formData.outputPath}
            onChange={handleInputChange}
            placeholder="outputPath"
          />
        </Form.Group>
      </p>

      <p>
        Output Format
        <Dropdown onSelect={handleOutputFormatChange}>
          <Dropdown.Toggle variant="Secondary">
            {formData.outputFormat || "Output Format"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="avro">avro</Dropdown.Item>
            <Dropdown.Item eventKey="csv">csv</Dropdown.Item>
            <Dropdown.Item eventKey="xml">xml</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </p>

      <Dropdown onSelect={handleAllAttributesChange}>
        <Dropdown.Toggle variant="Secondary">
          {formData.attributes.allAttributes || "Get All Attributes"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="true">true</Dropdown.Item>
          <Dropdown.Item eventKey="false">false</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {formData.attributes.allAttributes === "false" && (
        <div>
          {formData.attributes.attributesList.map((attribute, index) => (
            <p key={index}>
              <strong>Attribute:</strong> {Object.keys(attribute)[0]}, 
              <strong> Alias:</strong> {Object.values(attribute)[0].alias || "N/A"}
            </p>
          ))}

          <Dropdown
            onSelect={(eventKey) =>
              setNewAttribute({ ...newAttribute, attributeName: eventKey })
            }
          >
            <Dropdown.Toggle variant="Secondary">
              {newAttribute.attributeName || "Select Attribute Name"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {attributeOptions.map((option, index) => (
                <Dropdown.Item key={index} eventKey={option}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="alias"
              value={newAttribute.alias}
              onChange={handleNewAttributeChange}
              placeholder="Attribute Alias"
            />
          </Form.Group>

          <Button onClick={handleAddAttribute} variant="dark">
            Add Attribute
          </Button>
        </div>
      )}

      <Button className="mt-3" type="submit" variant="warning">
        Submit
      </Button>
    </Form>
  );
};

export default AddExtract;
