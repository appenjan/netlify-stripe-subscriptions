const content = {
  free: {
    src:
      'images/undraw_Freelancer_re_irh4.png',
    alt: 'corgi in the park with a sunset in the background',
    allowedRoles: ['free', 'pro', 'premium'],
  },
  pro: {
    src:
      'images/undraw_business_decisions_gjwy.png',
    alt: 'close-up of a corgi with its tongue hanging out',
    allowedRoles: ['pro', 'premium'],
  },
  premium: {
    src:
      'images/undraw_pitching_36ol.png',
    alt: 'corgi in a tent with string lights in the foreground',
    allowedRoles: ['premium'],
  },
};

exports.handler = async (event, context) => {
  const { type } = JSON.parse(event.body);
  const { user } = context.clientContext;
  const roles = user ? user.app_metadata.roles : false;
  const { allowedRoles } = content[type];

  if (!roles || !roles.some((role) => allowedRoles.includes(role))) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        src:
          'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1592618179/stripe-subscription/subscription-required.jpg',
        alt: 'corgi in a crossed circle with the text “subscription required”',
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(content[type]),
  };
};
