const dummy = (blogs) => {
  return 1;
};

const favoriteBlog = (blogs) => {
  let highestCountBlog = null;

  if (blogs.length > 0) {
    highestCountBlog = blogs[0];
  } else {
    return { blog: 'empty blog' };
  }

  blogs.forEach((blog) => {
    blog.likes > highestCountBlog.likes ? (highestCountBlog = blog) : null;
  });
  console.log(
    `Favorite blog: { title: ${highestCountBlog.title}, author: ${highestCountBlog.author}, likes: ${highestCountBlog.likes} }`
  );

  return highestCountBlog;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, cur) => total + cur.likes, 0);
};

const mostBlogs = (blogs) => {
  const uniqueArrayWithCounts = blogs.reduce((accum, val) => {
    const dupeIndex = accum.findIndex(
      (arrayItem) => arrayItem.author === val.author
    );

    if (dupeIndex === -1) {
      accum.push({
        count: 1,
        ...val,
      });
    } else {
      accum[dupeIndex].count++;
    }
    return accum;
  }, []);

  const maxCount = uniqueArrayWithCounts.filter(
    (el) =>
      el.count ===
      Math.max.apply(
        Math,
        uniqueArrayWithCounts.map((el) => el.count)
      )
  );

  console.log(
    `Most blogs: { author: ${maxCount[0].author}, count: ${maxCount[0].count}}`
  );

  return {
    author: maxCount[0].author,
    count: maxCount[0].count,
  };
};

const mostLikes = (blogs) => {
  const uniqueArrayWithCounts = blogs.reduce((accum, val) => {
    const dupeIndex = accum.findIndex(
      (arrayItem) => arrayItem.author === val.author
    );

    if (dupeIndex === -1) {
      accum.push({
        count: 1,
        ...val,
      });
    } else {
      accum[dupeIndex].count++;
      accum[dupeIndex].likes += val.likes;
    }
    return accum;
  }, []);

  const maxCount = uniqueArrayWithCounts.filter(
    (el) =>
      el.likes ===
      Math.max.apply(
        Math,
        uniqueArrayWithCounts.map((el) => el.likes)
      )
  );

  console.log(
    `Most likes: { author: ${maxCount[0].author}, likes: ${maxCount[0].likes}}`
  );

  return {
    author: maxCount[0].author,
    likes: maxCount[0].likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
