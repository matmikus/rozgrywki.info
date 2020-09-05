export const isForbiddenRouteName = (routeName: string) => {
     const forbiddenNames = [
         'index',
         'login',
         'logout',
         'moje',
         '404',
         'competition',
         'edit',
     ];

    return forbiddenNames.includes(routeName);
};
