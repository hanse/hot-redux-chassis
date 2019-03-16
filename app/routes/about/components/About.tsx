import styles from './About.css';
import React from 'react';
import Markdown from 'react-markdown';
import readmeContent from 'raw-loader!README.md';

const About = () => (
  <div className={styles.root}>
    <Markdown source={readmeContent} />
  </div>
);

export default About;
