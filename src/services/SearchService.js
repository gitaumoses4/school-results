import Api from './api';

const schools = [
  {
    name: 'Kirinyaga Secondary School',
    code: '1'
  },
  {
    name: 'Bright Star Academy',
    code: '2'
  },
  {
    name: 'Kiwanja Secondary School',
    code: '3'
  },
  {
    name: 'Kirinyaga Secondary School',
    code: '1'
  },
  {
    name: 'Bright Star Academy',
    code: '2'
  },
  {
    name: 'Kiwanja Secondary School',
    code: '3'
  },
  {
    name: 'Kirinyaga Secondary School',
    code: '1'
  },
  {
    name: 'Bright Star Academy',
    code: '2'
  },
  {
    name: 'Kiwanja Secondary School',
    code: '3'
  },
  {
    name: 'Kirinyaga Secondary School',
    code: '1'
  },
  {
    name: 'Bright Star Academy',
    code: '2'
  },
  {
    name: 'Kiwanja Secondary School',
    code: '3'
  }
];

export default class SearchService {
  static searchSchools(search = '') {
    return Api.get(`/search?term=${search}`, {
      success: true,
      message: 'School Fetched successfully',
      schools: schools.filter(school => new RegExp(search.toLowerCase()).test(school.name.toLowerCase()))
    });
  }
}
