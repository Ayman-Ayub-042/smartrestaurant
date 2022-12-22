import React, { useState } from 'react';
// import "./style.css";
// import Faq from "react-faq-component";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";


const Faq = () => {
    return (
        <>
         <Accordion className='mb-6'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 16,
            }}
          >
            Accordion Demo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Greetings of the day :)</Typography>
        </AccordionDetails>
      </Accordion>
            <Accordion defaultActiveKey="0">
            <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Accordion Demo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Greetings of the day :)</Typography>
        </AccordionDetails>
                {/* <Accordion.Item eventKey="0">
                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Accordion Item #3</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Accordion Item #4</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item> */}
            </Accordion>
            {/* <Row className="d-grid gap-3">
                    <Col className="d-grid gap-3">
                        <Row>
                            <QuestAnswer
                                question="Why do we maek it?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>

                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
    </Col> */}
        </>
    );
};

export default Faq;
