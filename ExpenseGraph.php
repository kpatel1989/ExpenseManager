<div id="expenseHistory">
	<div id="graphMenu">
		<div class="graphMenuItem" id="categoryReport">
			Category-wise Report
		</div>
		<div class="graphMenuItem" id="monthlyReport">
			Daily Report
		</div>
		<div class="graphMenuItem" id="yearlyReport">
			Monthly Report
		</div>
	</div>
	<div id="graphSubMenu">
		<div class="graphSubMenuItem">
			<select id="lstMonth">
				<option value="01" id="option0"> January </option>
				<option value="02" id="option1">  February </option>
				<option value="03" id="option2">  March </option>
				<option value="04" id="option3">  April </option>
				<option value="05" id="option4">  May </option>
				<option value="06" id="option5">  June </option>
				<option value="07" id="option6">  July </option>
				<option value="08" id="option7">  August </option>
				<option value="09" id="option8">  September </option>
				<option value="10" id="option9">  October </option>
				<option value="11" id="option10">  November </option>
				<option value="12" id="option11"> December </option>
			</select>
		</div>
		<div class="graphSubMenuItem">
			<div>
				Type : <input type=radio name=historyMode  value="Graph" checked/> Graph
				<input type=radio name=historyMode  value="Memo"/> Memo
			</div>
		</div>
	</div>
	<div class="graph" id="graph">

	</div>
	<div class="memo" id="memo">

	</div>
</div>
