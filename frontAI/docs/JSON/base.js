export const data = {
  state: {
    type: "component",
    header: {
      title: "KnowMe Playground",
      favicon:
        "/@fs/usr/src/app/src/assets/Logo/logo.png?origWidth=411&origHeight=415&origFormat=png",
    },
    currentGrid: ["2", "0"],
    navbar: {
      titles: [
        { id: 206, text: "Formation" },
        { id: 11, text: "Experience" },
      ],
      logo: { img: null, text: "KnowMe", rounded: "rounded-md" },
      design: { sticky: true, type: 2 },
      socialMedia: {
        links: [
          {
            text: "Facebook",
            src: "https://facebook.com",
            icon: "https://cdn.icon-icons.com/icons2/2428/PNG/512/facebook_black_logo_icon_147136.png",
            srcIcon:
              "https://cdn.icon-icons.com/icons2/2428/PNG/512/facebook_black_logo_icon_147136.png",
            iconSize: 38,
            radius: 999,
          },
        ],
        size: 35,
        radius: 999,
        align: "right",
      },
    },
    editing: {
      idDomain: null,
      webURL: null,
      isPublic: null,
      category: "Administrative",
    },
    edit: true,
    content: [
      {
        type: "TitleComponent",
        text: "Experience",
        bold: true,
        id: 11,
        align: "left",
        size: 1,
        inNavbar: true,
      },
      {
        type: "ParagraphComponent",
        text: "My portfolio showcases my passion for design and creativity, from vibrant brands to captivating digital experiences.",
        bold: false,
        id: 18,
        align: "left",
        size: 1,
      },
      {
        type: "LinksComponent",
        links: [
          {
            text: "Github",
            src: "",
            icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
            srcIcon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
          },
        ],
        id: 139,
        align: "left",
        radius: 999,
        size: 38,
      },
      {
        type: "TitleComponent",
        text: "Formation",
        bold: true,
        id: 206,
        align: "left",
        size: 1,
        inNavbar: false,
      },
      {
        type: "TimelineComponent",
        title: "Experiencia",
        timeline: [
          { date: "2024", text: "sadasd asd as dasd as dasd as" },
          { text: "", date: "" },
        ],
        id: 527,
      },
      {
        type: "ProjectComponent",
        title: "This is my project!",
        id: 547,
        src: "https://via.placeholder.com/150",
        srcOrig: "https://via.placeholder.com/150",
        border: 2,
        radius: "2xl",
        width: 250,
        height: 250,
        rotate: 0,
        flip: 1,
        zoom: 100,
        titleSize: 1,
        textSize: 1,
        links: [],
        text: "My portfolio showcases my passion for design and creativity, from vibrant brands to captivating digital experiences.",
        align: "left",
      },
      {
        type: "LinksComponent",
        links: [
          {
            text: "Facebook",
            src: "https://facebook.com",
            icon: "https://cdn.icon-icons.com/icons2/2428/PNG/512/facebook_black_logo_icon_147136.png",
            srcIcon:
              "https://cdn.icon-icons.com/icons2/2428/PNG/512/facebook_black_logo_icon_147136.png",
            iconSize: 38,
            radius: 999,
          },
          {
            text: "Github",
            src: "",
            icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
            srcIcon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
          },
        ],
        id: 559,
        align: "left",
        radius: 999,
        size: 38,
      },
      {
        type: "ImageComponent",
        src: "https://via.placeholder.com/150",
        srcOrig: "https://via.placeholder.com/150",
        border: 2,
        radius: "2xl",
        width: 250,
        height: 250,
        rotate: 0,
        flip: 1,
        zoom: 100,
        align: "left",
        id: 580,
      },
      {
        type: "ToolsComponent",
        chips: [
          {
            text: "React",
            src: "",
            icon: "/@fs/usr/src/app/src/assets/react-js-icon.svg?origWidth=122.88&origHeight=109.43&origFormat=svg",
            srcIcon:
              "/@fs/usr/src/app/src/assets/react-js-icon.svg?origWidth=122.88&origHeight=109.43&origFormat=svg",
          },
        ],
        id: 604,
        align: "left",
        style: 0,
        radius: 8,
        size: 38,
      },
    ],
    contentIndex: 1,
    componentItem: {
      key: 605,
      id: "ToolsComponent",
      mode: "add",
      isDraggingStarted: true,
    },
    palette: {
      index: 0,
      type: "light",
      h1: "#EF4444",
      h2: "#F87171",
      h3: "#F87171",
      paragraph: "#44403C",
      background: "#FEF2F2",
      border: "#FCA5A5",
      linkBackground: "#FCA5A5",
      linkHoverBackground: "#FECACA",
    },
    portfolioComponents: [
      {
        components: [
          [
            { type: "TitleComponent", id: 206 },
            { styleGrid: { justifyContent: "start" } },
          ],
          [
            { type: "LinksComponent", id: 139 },
            { type: "ParagraphComponent", id: 18 },
            { styleGrid: { justifyContent: "start" } },
          ],
          [
            { type: "ToolsComponent", id: 604 },
            { styleGrid: { justifyContent: "start" } },
          ],
        ],
        style: {
          sizes: [33.3, 33.3, 33.3],
          string: "minmax(40px,1fr) minmax(40px,1fr) minmax(40px,1fr)",
          showResizeDiv: [false, false, false],
        },
      },
      {
        components: [
          [{ styleGrid: { justifyContent: "start" } }],
          [
            { type: "ProjectComponent", id: 547 },
            { styleGrid: { justifyContent: "start" } },
          ],
          [
            { type: "ImageComponent", id: 580 },
            { type: "LinksComponent", id: 559 },
            { styleGrid: { justifyContent: "start" } },
          ],
        ],
        style: {
          sizes: [33.3, 33.3, 33.3],
          string: "minmax(40px,1fr) minmax(40px,1fr) minmax(40px,1fr)",
          showResizeDiv: [false, false, false],
        },
      },
      {
        components: [
          [{ styleGrid: { justifyContent: "start" } }],
          [{ styleGrid: { justifyContent: "start" } }],
          [{ styleGrid: { justifyContent: "start" } }],
        ],
        style: {
          sizes: [33.3, 33.3, 33.3],
          string: "minmax(40px,1fr) minmax(40px,1fr) minmax(40px,1fr)",
          showResizeDiv: [false, false, false],
        },
      },
      {
        components: [
          [
            { type: "TitleComponent", id: 11 },
            { type: "TimelineComponent", id: 527 },
            { style: { justifyContent: "start" } },
          ],
          [{ style: { justifyContent: "start" } }],
          [{ style: { justifyContent: "start" } }],
        ],
        style: {
          sizes: [33.3, 33.3, 33.3],
          string: "minmax(40px,1fr) minmax(40px,1fr) minmax(40px,1fr)",
          showResizeDiv: [false, false, false],
        },
      },
      {
        components: [
          [{ style: { justifyContent: "start" } }],
          [{ style: { justifyContent: "start" } }],
          [{ style: { justifyContent: "start" } }],
        ],
        style: {
          sizes: [33.3, 33.3, 33.3],
          string: "minmax(40px,1fr) minmax(40px,1fr) minmax(40px,1fr)",
          showResizeDiv: [false, false, false],
        },
      },
    ],
  },
  version: 0,
};
