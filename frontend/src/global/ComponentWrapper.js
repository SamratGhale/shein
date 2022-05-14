import React from 'react';
import { makeStyles } from '@mui/styles';
import Page from './Page';
import PropTypes from 'prop-types';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

ComponentWrapper.propTypes = {
  title: PropTypes.string
};
// ----------------------------------------------------------------------

function ComponentWrapper(props) {
  const classes = useStyles();

  return (
      <Page className = {classes.root} title="Artha">
          {props.children}
      </Page>
  );
}

export default ComponentWrapper;