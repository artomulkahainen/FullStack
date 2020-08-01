const listHelper = require('../utils/list_helper');

// BLOG LIST FOR TESTS
const blogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Lintulajit Suomessa',
    author: 'Kullervo Partanen',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Lintulajit Suomessa',
    author: 'Kullervo Partanen',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Lintulajit Ruotsissa',
    author: 'Kullervo Partanen',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Oispa limpparii',
    author: 'Matti Laajoki',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 6,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Oispa hampparii',
    author: 'Matti Laajoki',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0,
  },
];

// DUMMY TEST
test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

// TOTAL LIKES -TEST

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogList);
    expect(result).toBe(20);
  });
});

// FAVORITE BLOG -TEST

describe('favorite blog', () => {
  test('blog with highest likes was found', () => {
    const result = listHelper.favoriteBlog(blogList);
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Oispa limpparii',
      author: 'Matti Laajoki',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0,
    });
  });
});

describe('writer with most blogs', () => {
  test('was found', () => {
    const result = listHelper.mostBlogs(blogList);
    expect(result).toEqual({ author: 'Kullervo Partanen', count: 3 });
    //console.log(result);
  });
});

describe('writer with most likes', () => {
  test('was found', () => {
    const result = listHelper.mostLikes(blogList);
    expect(result).toEqual({ author: 'Matti Laajoki', likes: 9 });
  });
});
