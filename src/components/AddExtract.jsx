import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Dropdown } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

const AddExtract = () => {
  const [formData, setFormData] = useState({
    extractName: '',
    model: '',
    attributes: {
      allAttributes: false,
      attributesList: {} 
    },
    dateFrom: '',
    dateTo: '',
    outputFormat: '',
    outputPath: '',
    deliveryFormat: '',
  });

  const [newAttribute, setNewAttribute] = useState({
    attributeName: '',
    alias: '',
    condition: ''
  });

  const attributeOptions = [
    "TradeDirection", "tradeType", "IsDestroyed", "redid", "comment", "tradeDate", 
    "tradeValueDate", "lakeStorageTimeStamp", "modelVersion", "nominalAmount", 
    "nominalCurrency", "quantity", "rawStorageTimeStamp", "sourceApplication", 
    "tradeld", "version", "lastUpdateTimeStamp", "product", "product.productid", 
    "Product.productName", "Product.maturity"
  ];

  // Handle input change for new attribute fields
  const handleNewAttributeChange = (event) => {
    const { name, value } = event.target;
    setNewAttribute({ ...newAttribute, [name]: value });
  };

  const handleAddAttribute = () => {
    setFormData(prevState => {
      return {
        ...prevState,
        attributes: {
          ...prevState.attributes,
          attributesList: {
            ...prevState.attributes.attributesList,
            [newAttribute.attributeName]: {
              alias: newAttribute.alias,
              condition: newAttribute.condition
            }
          }
        }
      };
    });
  
    // Clear the new attribute inputs after adding
    setNewAttribute({ attributeName: '', alias: '', condition: '' });
    console.log("attribute added");
    console.log(formData);  // Will still show the previous state, but now the new state will be reflected in the next render
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle dropdown selection change for output format
  const handleOutputFormatChange = (eventKey) => {
    setFormData({ ...formData, outputFormat: eventKey });
    console.log(formData);
  };

  const handleAllAttributesChange = (eventKey) => {
    setFormData({
      ...formData, 
      attributes: {
        ...formData.attributes, 
        allAttributes: eventKey
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    console.log(formData);
    const jsonString = JSON.stringify(formData);
    console.log("json string");
    console.log(jsonString);
  };

  return (
    <Form onSubmit={handleSubmit}  style={{ padding: '10px' }}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" name="extractName" value={formData.extractName} onChange={handleInputChange} placeholder="extract-name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control type="text" name="model" value={formData.model} onChange={handleInputChange} placeholder="otc or listed" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control type="date" name="dateFrom" value={formData.dateFrom} onChange={handleInputChange} placeholder="Date from" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control type="date" name="dateTo" value={formData.dateTo} onChange={handleInputChange} placeholder="Date to" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control type="text" name="outputPath" value={formData.outputPath} onChange={handleInputChange} placeholder="outputPath" />
      </Form.Group>

      <Dropdown onSelect={handleOutputFormatChange}>
        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
          {formData.outputFormat || "Output Format"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="avro">avro</Dropdown.Item>
          <Dropdown.Item eventKey="csv">csv</Dropdown.Item>
          <Dropdown.Item eventKey="xml">xml</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown onSelect={handleAllAttributesChange}>
        <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
          {formData.attributes.allAttributes || "get All attributes"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="true">true</Dropdown.Item>
          <Dropdown.Item eventKey="false">false</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {
        formData.attributes.allAttributes === 'false' && (
          <div>
            <Dropdown onSelect={(eventKey) => setNewAttribute({ ...newAttribute, attributeName: eventKey })}>
              <Dropdown.Toggle variant="Secondary" id="dropdown-attribute-name">
                {newAttribute.attributeName || "Select Attribute Name"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {attributeOptions.map((option, index) => (
                  <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Form.Group className="mb-3" controlId="attributeAlias">
              <Form.Control
                type="text"
                name="alias"
                value={newAttribute.alias}
                onChange={handleNewAttributeChange}
                placeholder="Attribute Alias"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="attributeCondition">
              <Form.Control
                type="text"
                name="condition"
                value={newAttribute.condition}
                onChange={handleNewAttributeChange}
                placeholder="Attribute Condition"
              />
            </Form.Group>

            <Button onClick={handleAddAttribute} variant="dark">Add Attribute</Button>
          </div>
        )
      }

      <Button className="mt-3" type="submit" variant="warning">Submit</Button>
    </Form>
  );
};

export default AddExtract;
