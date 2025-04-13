import { 
    rankWith, 
    isNumberControl, 
    optionIs,
    and
  } from '@jsonforms/core';
  
  /**
   * This tester checks if a control should be rendered with the custom rating control.
   * It will match controls that:
   * 1. Are number controls
   * 2. Have the 'format' option set to 'rating'
   */
  export const customRatingControlTester = rankWith(
    10,
    and(
      isNumberControl,
      optionIs('format', 'rating')
    )
  );