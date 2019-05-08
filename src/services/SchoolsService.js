import Api from './api';

const sample = 'http://www.ovh.net/files/1Mb.dat';

const other_files = [
  {
    id: 1,
    name: 'Differential Analysis.pdf',
    cost: 1950,
    file_type: 'differential'
  },
  {
    id: 2,
    name: 'Raw Data.pdf',
    cost: 1950,
    file_type: 'raw'
  },
  {
    id: 3,
    name: 'KCSE Analysis.pdf',
    cost: 1000,
    file_type: 'kcse'
  },
  {
    id: 4,
    name: 'Sub County Analysis.pdf',
    cost: 1500,
    file_type: 'subcounty'
  },
  {
    id: 5,
    name: 'County Analysis',
    cost: 1500,
    file_type: 'county'
  },
  {
    id: 6,
    name: 'Kenya Analysis',
    cost: 1500,
    file_type: 'country'
  }
];

const schools = [
  {
    name: 'Kirinyaga Secondary School',
    code: '1123',
    county_code: '02',
    subcounty_code: '0202',
    sample,
    other_files
  },
  {
    name: 'Bright Star Academy',
    code: '2123',
    county_code: '02',
    subcounty_code: '0202',
    sample,
    other_files
  },
  {
    name: 'Kiwanja Secondary School',
    code: '3643',
    county_code: '02',
    subcounty_code: '0202',
    sample,
    other_files
  },
];

export default class SchoolsService {
  static searchSchools(search = '') {
    return Api.get(`/search?term=${search}`, {
      success: true,
      message: 'School Fetched successfully',
      schools: schools.filter(school => new RegExp(search.toLowerCase()).test(school.name.toLowerCase()))
    });
  }

  static getSchool(code){
    const school = schools.find(school => school.code === code);
    return Api.get(`/school/${code}`,{
      success: !!school,
      message: 'School retrieved successfully',
      school
    }, school ? 200 : 404);
  }

  static requestFiles(data){
    return Api.post('/request-files', data, {
      success: true,
      message: 'Files requested successfully'
    });
  }

  static requestInfo(token){
    return Api.post('/request-info', {token}, {
      success: true,
      message: 'Successfully retrieved request info',
      request_info: {
        email: 'findingedward@gmail.com',
        phone_number: '+254700187754',
        school_name: 'Expanded interactive help-desk',
        school_code: '713',
        files: [
          {
            'id': 90,
            'name': 'Differential Analysis.pdf'
          },
          {
            'id': 91,
            'name': 'Raw Data.pdf'
          }
        ]
      }
    });
  }

  static requestPayment(data){
    return Api.post('/request-payment', data, {
      success: true,
      message: 'Successfully requested payment'
    });
  }
}
