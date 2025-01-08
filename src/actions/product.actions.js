import axios from "../helpers/axios";
import { productConstants } from "./constants";
const initParams = {
  page: 1,
  pageSize: 8,
  from: 0,
  to: 0,
};
const ORDER_OPTIONS = [
  {
    value: "newest",
    name: "Newest",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  {
    value: "priceLowToHigh",
    name: "Price - Low to high",
    sortBy: "salePrice",
    sortOrder: "asc",
  },
  {
    value: "priceHighToLow",
    name: "Price - High to low",
    sortBy: "salePrice",
    sortOrder: "desc",
  },
];
export const getByQuery = (params, size = initParams.pageSize) => {
  Object.keys(params).forEach(
    (key) =>
      (params[key] === undefined || params[key].length === 0) &&
      delete params[key]
  );
  const { page, pageSize, from, to, orderBy, ...dynamicParams } = {
    ...initParams,
    ...params,
    pageSize: size,
  };
  let price = undefined;
  if (from && to) {
    price = `${from}..${to}`;
  } else if (from && !to) {
    price = `${from}..`;
  } else if (!from && to) {
    price = `..${to}`;
  }
  const sort = orderBy
    ? {
        sortOrder: ORDER_OPTIONS.find((x) => x.value === orderBy).sortOrder,
        sortBy: ORDER_OPTIONS.find((x) => x.value === orderBy).sortBy,
      }
    : {
        sortOrder: ORDER_OPTIONS[0].sortOrder,
        sortBy: ORDER_OPTIONS[0].sortBy,
      };
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_BY_QUERY_REQUEST });
      const res = await axios.get(`products/search/${page}/${pageSize}`, {
        params: { ...dynamicParams, salePrice: price, ...sort },
      });
      const result = {
        ...res.data.data,
        ...res.data.data.result,
        products: res.data.data.result.items.map((product) => ({
          ...product,
          price: product.salePrice,
        })),
      };
      dispatch({
        type: productConstants.GET_PRODUCT_BY_QUERY_SUCCESS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCT_BY_QUERY_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
export const getBySearch = (params, size = initParams.pageSize) => {
  const sort = params.orderBy
    ? {
        sortOrder: ORDER_OPTIONS.find((x) => x.value === params.orderBy)
          .sortOrder,
        sortBy: ORDER_OPTIONS.find((x) => x.value === params.orderBy).sortBy,
      }
    : {
        sortOrder: ORDER_OPTIONS[0].sortOrder,
        sortBy: ORDER_OPTIONS[0].sortBy,
      };
  const { orderBy, page, from, to, ...orderParams } = params;
  let price = "..";
  if (from && to) {
    price = `${from}..${to}`;
  } else if (from && !to) {
    price = `${from}..`;
  } else if (!from && to) {
    price = `..${to}`;
  }
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_BY_QUERY_REQUEST });
      const res = await axios.get(`products/search/${params.page}/${8}`, {
        params: { ...orderParams, salePrice: price, ...sort },
      });
      const result = {
        ...res.data.data.result,
        metadata: res.data.data.metadata,
        products: res.data.data.result.items.map((product) => ({
          ...product,
          price: product.salePrice,
        })),
      };
      dispatch({
        type: productConstants.GET_PRODUCT_BY_QUERY_SUCCESS,
        payload: result,
      });
    } catch (error) {
      console.log({ error });
      dispatch({
        type: productConstants.GET_PRODUCT_BY_QUERY_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
export const getAll = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_BY_QUERY_REQUEST });
      const res = await axios.get(`products`);
      const result = {
        ...res.data.data,
        products: res.data.data.products.map((product) => ({
          ...product,
          price: product.salePrice,
        })),
      };
      dispatch({
        type: productConstants.GET_PRODUCT_BY_QUERY_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_QUERY_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
export const getBySlug = (slug) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST });
      const res = await axios.get(`products/${slug}`);
      const products = res.data.data.map((product) => ({
        ...product,
        price: product.salePrice,
        productPictures: product.productPictures,
      }));
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
        payload: { products },
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
// export const getProductPage = (params) => {
//   return async (dispatch) => {
//     try {
//       const { categoryId, type } = params;
//       dispatch({ type: productConstants.GET_PAGE_REQUEST });
//       const res = await axios.get(`page/${categoryId}/${type}`);
//       if (res.status === 200) {
//         dispatch({
//           type: productConstants.GET_PAGE_SUCCESS,
//           payload: { page: res.data.page },
//         });
//       } else {
//         dispatch({
//           type: productConstants.GET_PAGE_FAILURE,
//           payload: { error: res.data.error },
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: productConstants.GET_PAGE_FAILURE,
//         payload: { error },
//       });
//     }
//   };
// };

export const getProductById = (params) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_DETAIL_REQUEST });
    let res;
    try {
      const { id } = params;
      res = await axios.get(`product/${id}`);
      const productDetails = {
        ...res.data.data,
        price: res.data.data.salePrice,
      };
      dispatch({
        type: productConstants.GET_DETAIL_SUCCESS,
        payload: { productDetails },
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_DETAIL_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getProductByCompare = ({ id1, id2 }) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_COMPARE_REQUEST });
    try {
      const [res1, res2] = await Promise.all([
        axios.get(`product/${id1}`),
        axios.get(`product/${id2}`),
      ]);
      const productCompare = {
        product1: {
          ...res1.data.data,
          price: res1.data.data.salePrice,
        },
        product2: {
          ...res2.data.data,
          price: res2.data.data.salePrice,
        },
      };

      dispatch({
        type: productConstants.GET_COMPARE_SUCCESS,
        payload: { productCompare },
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_COMPARE_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getProduct1 = (params) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT1_REQUEST });
    let res;
    try {
      const { id } = params;
      res = await axios.get(`product/${id}`);
      const product1 = {
        ...res.data.data,
        price: res.data.data.salePrice,
      };
      dispatch({
        type: productConstants.GET_PRODUCT1_SUCCESS,
        payload: { product1 },
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT1_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getProduct2 = (params) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT2_REQUEST });
    let res;
    try {
      const { id } = params;
      res = await axios.get(`product/${id}`);
      const product2 = {
        ...res.data.data,
        price: res.data.data.salePrice,
      };
      dispatch({
        type: productConstants.GET_PRODUCT2_SUCCESS,
        payload: { product2 },
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT2_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const submitComment = (comment) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.COMMENT_REQUEST });
    try {
      const fakeMock = () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(comment);
          }, 500);
        });
      const res = await fakeMock();
      console.log(res);
      dispatch({
        type: productConstants.COMMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: productConstants.COMMENT_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};

export const getComments = ({ id, page }) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_COMMENTS_REQUEST });
    try {
      const res = await axios.get(`/product/comment/${id}/${page}/10`);
      const data = {
        comments: res.data.data.result.result.items.map((i) => ({
          id: i.comment._id,
          username: i.comment.userName,
          rating: i.comment.rating,
          comment: i.comment.content,
          replies: i.comment.subComment,
          createdAt: i.comment.createdAt,
          subComment: i.comment.subComment,
        })),
        totalPage: res.data.data.result.result.totalPage,
        page: res.data.data.result.result.currentPage,
      };
      let totalData = [
        { _id: 1, count: 0 },
        { _id: 4, count: 0 },
        { _id: 3, count: 0 },
        { _id: 5, count: 0 },
        { _id: 2, count: 0 },
      ];
      if (res.data.data.total.length) {
        res.data.data.total.forEach((r) => {
          totalData.find((t) => t._id === r._id).count = r.count;
        });
      }
      const ratingsSort = totalData.sort((a, b) => b._id - a._id);
      console.log({ ratingsSort });

      const sum = (arr) => arr.reduce((p, c) => p + c, 0);

      const totalCount = sum(ratingsSort.map((r) => r.count));
      console.log({ totalCount });
      const ratings = ratingsSort.map((r) => ({
        ...r,
        star: r._id,
        percent:
          Number(r.count) === 0 && Number(totalCount) === 0
            ? 0
            : Number(((r.count / totalCount) * 100).toFixed(0)),
      }));
      if (Number(totalCount) !== 0) {
        ratings[ratings.length - 1].percent =
          100 - sum(ratings.slice(0, -1).map((x) => x.percent));
      }

      const average = (arr) =>
        Math.round(arr.reduce((a, b) => a + b) / totalCount);
      const avg = average(ratings.map((r) => r.count * r._id)) || 0;
      const avgRating = avg > 5 ? 5 : avg;

      dispatch({
        type: productConstants.GET_COMMENTS_SUCCESS,
        payload: {
          comments: data.comments,
          totalCommentPage: data.totalPage,
          commentPage: data.page,
          ratings,
          avgRating,
          totalComment: totalCount,
        },
      });
    } catch (error) {
      console.log({ error });
      dispatch({
        type: productConstants.GET_COMMENTS_FAILURE,
        payload: { error: "error" },
      });
    }
  };
};
