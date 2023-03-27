'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Songs';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        name: 'name',
        content: 'sample.url',
        img: 'img.url',
        description: 'this is a sample description'
      },
      {
        userId: 2,
        name: 'name2',
        content: 'sample2.url',
        img: 'img2.url',
        description: 'this is a sample description2'
      },
      {
        userId: 3,
        name: 'name3',
        content: 'sample3.url',
        img: 'img3.url',
        description: 'this is a sample description3'
      },
      {
        userId: 1,
        name: 'name4',
        content: 'https://aa-sounclod-clone-bucket.s3.us-east-1.amazonaws.com/Boo-womp.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLWVhc3QtMSJGMEQCID0uk5shoW%2FugB%2BKYiCMpwhxpo2Z7Go7IksjbuS9eJjPAiBGszR5qvl770D4FkRq911WGvb989vtwCfyUPamCrT2rCrkAggmEAAaDDQyNDgyOTI3MTczNCIMdwkxrlY%2F7JxlWEYFKsEC0%2B0yPGbwXh8SWKA5xX45ZSrEOey8VzX5T9TZ8GMOhc2tYtNOQzuSFyHZrXiNKL8cU%2FnFvR6g7XTvUsImSHo%2B6XtLwk6lklXfR79jeJyuC0oWw7adatQkaGJcW9GzGLCJpOq8YMWr55ve5wRpej2FqoLO%2F9uQBg8bx1OqpwGTgZKfc5eMXedrO8rnyghq0IUm0Nvx3Bz13SXl3L0ZiLl%2BQ9jvQHUbV%2BeMc2o%2FE10EHIsRO0gGSkuKQcc1dg5EJsUBZOwblFPx2HNsWP5QH98whhiEVp1tW1nzUc1Z3CpO7%2BTeikosfQaAGe6wMmGvdZzk%2B53SvsMFhjK2tvlthylY0lyAWUu54r%2BYPJOj0VwG9g8p0hG4Wpx%2BWDNn3I9tIIkAfFXsDZAGbh4OBiz0oe3%2Be6fpmtwXYKoIqMFQeIef8x%2F2MNa4hKEGOrQCkeqznKSJ4yN31XnUmzMIIxdSujlJRu5zuDG63aEeCsHXIe2TZtOoItZsbKkOoZOmaY342LuJngcsueLL4ItcXgIhHCSZag4keuhnj%2BsYLaiQ3GFVEfke4jqteRnwwFPeNxMazhdKKHR1HC8o8z0o6GmQXsAXsMPhUiokD2YpjATWf%2FRnr0jZaFVoKm2oxxHt4hK0z2ygryk9xjpuzm%2FVdc8WcJXCJJ9%2FLvjrPFnGNjW9HKwG8rLdSYav1Yh%2FD1mzZBUzPSrTowbNBl57bVTzWfm%2FckZYF%2BHsgA6ZUPloF9bMG5s%2BkskXABuIaxK7ttwRTMEXhaeUBN5saEvYo1V7AD7nnMc2doZJ0fOYT%2BFy%2B6pa3ulDbxwc7AvFXBNkNhIwaRo9%2B6t4sIYIrOihF%2F6rWwB0nlM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230327T080548Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAWF2OMH23M5ZTD2MU%2F20230327%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=964dba220cf3e24f9f07e74ec2b96b41e4e4f7987209dd1579d88e2d5e51676e',
        img: 'img4.url',
        description: 'this is a sample description4'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Songs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['name', 'name2', 'name3'] }
    }, {});
  }
};
