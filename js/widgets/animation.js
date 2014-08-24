Animation = function(){

};

Animation.AnimationType = {LINEAR_INCREASE : 0, LINEAR_DECREASE : 1, EXPONENTIAL_INCREASE : 2, EXPONENTIAL_DECREASE : 3};

Animation.prototype = {

	m_AnimationType = null,
	m_Timer : -1,
	animate : function(object, startValue, endValue, animationType,timeInterval)
	{
		distance = Math.abs(endValue - startValue);
		this.m_Timer = -1;

		switch(animationType)
		{
			case Animation.AnimationType.LINEAR_INCREASE :
				increament = distance/timeInterval;

			break;
			case Animation.AnimationType.LINEAR_DECREASE:

			break;
			case Animation.AnimationType.EXPONENTIAL_INCREASE:

			break;
			case Animation.AnimationType.EXPONENTIAL_DECREASE:

			break;
		}
	}
};
