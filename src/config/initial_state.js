'use strict';

module.exports = {
  data: {
    contacts: [],
    detailContact: {}
  },
  ui: {
    contacts: {
      isEditing: false,
      editErrors: {},
      lastListFetch: 0,
      lastDetailFetch: 0
    }
  },
  route: {
    page: 'contact_list'
  }
};