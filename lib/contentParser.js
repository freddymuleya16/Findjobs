import parseMDX from "@lib/utils/mdxParser";
import { db } from "_firebase";
import { collection,doc, getDoc, getDocs } from "firebase/firestore";
//import fs from "fs";
import matter from "gray-matter";
import path from "path";

// get list page data, ex: _index.md
export const getListPage2 = async (filePath) => {
  const pageData = fs.readFileSync(filePath, "utf-8");
  const pageDataParsed = matter(pageData);
  const notFoundPage = fs.readFileSync("content/404.md", "utf-8");
  const notFoundDataParsed = matter(notFoundPage);
  let frontmatter, content;

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

export const getListPage = async (filePath) => {
 
  {
    try {
      const docRef = doc(db,filePath);
      const document = await getDoc(docRef);
  
      if (!document.exists) {
        return ('Blog content not found');
      }
  
      const blogContent = document.data();

      return {
        frontmatter:blogContent
      }
    } catch (error) {
      console.error(error);
      return ('Error getting blog content');
    }
  };
  return {
    frontmatter,
    content,
    mdxContent,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePage2 = (folder) => {
  const filesPath = fs.readdirSync(folder);
  const sanitizeFiles = filesPath.filter((file) => file.endsWith(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter: frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) =>
      !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

export const getSinglePage = async (folder) => {
  console.log(folder)
  const postRef = collection(db,  folder);
  const querySnapshot = await getDocs(postRef);
  

  const posts = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    post.id = doc.id;
  // post.addresses=   doc.get('addresses')
 if(post?.date) post.date = new Date(post.date.toDate()).toISOString()
    
    if(post.id.match(/^(?!_)/)){
      posts.push({ frontmatter: post, slug:  post.id, content: post.content });
    }
  });
  return posts;
};

// get a regular page data from many pages, ex: about.md
export const getRegularPage = async (slug) => {
  const publishedPages =await getSinglePage("content");
  const pageData = publishedPages.filter((data) => data.slug === slug);
 // const notFoundPage = fs.readFileSync("content/404.md", "utf-8");
  const notFoundDataParsed = await getListPage("content/404")
console.log("sdfsdf",pageData)
  let frontmatter, content;
  if (pageData[0]) {
    content = pageData[0].content??null;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.frontmatter.content;
    frontmatter = notFoundDataParsed.frontmatter;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

export const getRegularPage2 = async (slug) => {
  const publishedPages =await getSinglePage("content");
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const notFoundPage = fs.readFileSync("content/404.md", "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter, content;
  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};
