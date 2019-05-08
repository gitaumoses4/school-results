import React from 'react';
import PropTypes from 'prop-types';

const Sample = () => (
  <ul>
    <li>
      A sample of our Differential Analysis and part of raw data. Download this file to confirm that the data belongs to your school.
    </li>
    <li>
      This sample is free
    </li>
  </ul>
);

const DifferentialAnalysis = () => (
  <ul>
    <li>
      Your schools KCSE analysis from year 2014.
    </li>
    <li>
      Graphical representations of the analysis.
    </li>
    <li>
      Quality grades analysis (How many students scored C+ and above in every subject and overall as well as D+ and below)
      and graphical representations of the same.
    </li>
    <li>
      Trend analysis (We have deduced the trend for every subject, has the subject been dropping since 2014 or has the
      subject been improving and at what rate?). This will help you reward the teachers involved or warn some.
    </li>
    <li>
      Target. We have set for you the best Targets for 2019 and 2020 KCSE having in mind the trend and achievability of the same.
      What criteria did you use to set 2019 KCSE target?
      Was it random or analysis based?
    </li>
  </ul>
);

const RawData = () => (
  <ul>
    <li>
      This is the KCSE Raw data from 2014 for your school. Some schools have lost their data of the data is not well
      documented. Download this and store the data in files.
    </li>
    <li>
      Students are ranked from the highest to the lowest by aggregate points.
    </li>
  </ul>
);

const KCSEAnalysis = () => (
  <ul>
    This is the normal KCSE Analysis for your school. This data can be stored for internal use, or incase the subcounty
    office requires such data. The analysis is a summary of all subjects and overall analysis since the year 2014 for your school.
  </ul>
);

const SubCounty = () => (
  <ul>
    <li>
      This is the analysis of your sub-county from 2014. What was the position of your school in every subject in your subcounty?
    </li>
    <li>
      Compare your school with the others. See if your school has been rising in positions in the subcounty or not.
    </li>
    <li>
      This analysis contains analysis for the whole sub-county in all subjects and the overall ranking. Check your school there.
    </li>
  </ul>
);

const County = () => (
  <ul>
    <li>
      This is the analysis of your county from 2014. What was the position of your school in every subject in your county?
      Compare your school with the others. See if your school has been rising in positions in the subcounty or not.
    </li>
    <li>
      This analysis contains analysis for the whole sub-county in all subjects and the overall ranking. Check your school there.
    </li>
  </ul>
);

const Kenya = () => (
  <ul>
    <li>
      This is the analysis of KENYA KCSE from 2014. What was the position of your school in every subject in KENYA?
      Compare your school with the others. See if your school has been rising in positions in the KENYA or not.
    </li>
    <li>
      This analysis contains analysis for the whole COUNTRY in all subjects and the overall ranking. Check your school there.
    </li>
  </ul>
);

const All = () => (
  <ul>
    <li>
      You can buy all the above data at a 20% discount cost. All data will be sent into your email address.
    </li>
  </ul>
);

export const FileTypes = {
  sample: 'Sample',
  differential: 'Differential Analysis',
  kcse: 'KCSE Analysis',
  raw: 'Raw Data',
  subcounty: 'Sub County Analysis',
  county: 'County Analysis',
  country: 'Kenya Analysis',
  all: 'Buy All'
};

const types = {
  sample: Sample(),
  differential: DifferentialAnalysis(),
  kcse: KCSEAnalysis(),
  raw: RawData(),
  subcounty: SubCounty(),
  county: County(),
  country: Kenya(),
  all: All()
};

const FileDescription = ({ type }) => (
  <div className="file-description">
    {
      types[type]
    }
  </div>
);

FileDescription.propTypes = {
  type: PropTypes.string
};

FileDescription.defaultProps = {
  type: 'sample'
};

export default FileDescription;
