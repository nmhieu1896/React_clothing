import React from "react";
import { Link, Route } from 'react-router-dom';
import Directory from '../../components/directory/directory.component';

import "./homepage.styles.scss";


export const HomePage = () => (
  <div className="homepage">
      <Directory/>
  </div>
);
