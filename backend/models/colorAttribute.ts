import { Schema, model } from "mongoose"
import { AttributeSkeleton } from "../types/colorTypes"

const colorAttributeSchema = new Schema<AttributeSkeleton>({
  red: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  orange: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  yellow: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  lime: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  green: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  turqoise: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  blue: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  violet: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  magenta: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  },
  rose: {
    vivid: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    pastel: {
      light: [String],
      neutral: [String],
      dark: [String]
    },
    muted: {
      light: [String],
      neutral: [String],
      dark: [String]
    }
  }
})

colorAttributeSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

export const ColorAttribute = model('ColorAttribute', colorAttributeSchema)