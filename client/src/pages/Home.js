import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

function Home() {
    return (
        <section className="my-5">
            <h1 id="about">My Bootcamp Experience</h1>
            <div className="my-2">

                <InputGroup id='about' size='lg' className="mb-3">
                    <InputGroup.Text>About Me:</InputGroup.Text>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>

                <InputGroup id='experience' size='lg' className="mb-3">
                    <InputGroup.Text>Boot Camp Experience:</InputGroup.Text>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>

                <InputGroup id='tips' size='lg' className="mb-3">
                    <InputGroup.Text>Tips and Tricks:</InputGroup.Text>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>

                <InputGroup id='connections' size='sm' className="mb-3">
                    <InputGroup.Text>Connections:</InputGroup.Text>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>


                <InputGroup id='institution' size='sm' className="mb-3">
                    <InputGroup.Text>University/Institution:</InputGroup.Text>
                    <FormControl as="textarea" aria-label="With textarea" />
                </InputGroup>

                <Button>Submit</Button>

            </div>
        </section>
    );
}

export default Home;