'use strict';

module.exports = {
  data: {
    contacts: [],
    detailContact: {},
    me: null
  },
  ui: {
    contacts: {
      isEditing: false,
      editErrors: {},
      lastListFetch: 0,
      lastDetailFetch: 0
    },
    loginError: false
  },
  route: {
    page: 'contact_list'
  }
};