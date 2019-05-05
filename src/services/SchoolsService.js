import Api from './api';

const files = [
  {
    id: 0,
    name: 'Sample.pdf'
  },
  {
    id: 1,
    name: 'First.xls'
  },
  {
    id: 2,
    name: 'Second.pdf'
  },
  {
    id: 3,
    name: 'Third.pdf'
  }
];

const schools = [
  {
    name: 'Kirinyaga Secondary School',
    code: '1123',
    files
  },
  {
    name: 'Bright Star Academy',
    code: '2123',
    files
  },
  {
    name: 'Kiwanja Secondary School',
    code: '3643',
    files
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
}
