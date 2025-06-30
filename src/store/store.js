import { create } from "zustand";

const initState = {
  language: "en_US",
  name: "",
  category: "MARKETING",
  components: [
    {
      type: "BODY",
      text: "",
    },
    {
      type: "FOOTER",
      text: "",
    },
  ],
};

const useStore = create((set) => ({
  // initial state of the template
  template: initState,
  errorValidation: {},

  // methods to manipulate the template state
  changeValue: (key, value) =>
    set((state) => ({
      template: {
        ...state.template,
        [key]: value,
      },
    })),

  changeComponents: (component) => {
    set((state) => {
      const newComponents = state.template.components.map((c) => {
        if (c.type === component?.type) {
          return component;
        }

        return c;
      });

      return {
        template: {
          ...state.template,
          components: newComponents,
        },
      };
    });
  },

  removeComponent: (type) => {
    set((state) => {
      const newComponents = state.template.components?.filter(
        (c) => c.type !== type
      );

      return {
        template: {
          ...state.template,
          components: newComponents,
        },
      };
    });
  },

  addComponent: (component) => {
    set((state) => {
      // like remove existing header image and add new header text
      const allComponents = state.template.components?.filter(
        (c) => c.type != component.type
      );

      let newComponents = [...allComponents, component];

      return {
        template: {
          ...state.template,
          components: newComponents,
        },
      };
    });
  },

  //  add error validation messages

  addErrorValidation: (errorValidation) =>
    set(() => ({
      errorValidation,
    })),
}));

export default useStore;
