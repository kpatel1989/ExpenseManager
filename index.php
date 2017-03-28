<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Expense Manager</title>
<link href="/css/jquery-ui-1.10.4.css" rel="stylesheet" type="text/css" />
<link href="/css/style.css" rel="stylesheet" type="text/css" />
<link href="/css/menu.css" rel="stylesheet" type="text/css" />
<!--<link href="/css/CalenderViewDate.css" rel="stylesheet" type="text/css" />-->
<link href="/css/ExpenseManager.css" rel="stylesheet" type="text/css" />
	<link href="/css/widgets/charts.css" rel="stylesheet" type="text/css" />

<script src="/js/lib/underscore/underscore.js"></script>
<script src="/js/lib/jquery/jquery-1.11.0.js"></script>
<script src="/js/lib/backbone/backbone.js"></script>
<script src="/js/lib/jquery/jquery-ui-1.10.4.js"></script>
<script src="/js/lib/handlebars/handlebars-v1.3.0.js"></script>
<script src="/js/widgets/charts.js"></script>
<script src="/js/widgets/chartsModel.js"></script>

<script src="/js/main.js"></script>
<script src="/js/constants/StringConstants.js"> </script>
<script src="/js/model/Model.js" type="text/javascript"></script>
<script src="/js/model/ExpenseManagerModel.js" type="text/javascript"></script>
<script src="/js/view/View.js" type="text/javascript"></script>
<script src="/js/view/MenuView.js" type="text/javascript"></script>
<script src="/js/view/HomeUI.js" type="text/javascript"></script>
<!-- <script src="/js/handles/expenses.handlebars"></script> -->
<script src="/js/ExpenseManager.js" type="text/javascript"></script>
<script src="/js/view/ExpenseManagerCtrlr.js" type="text/javascript"></script>
<script src="/js/view/ExpenseHistory.js" type="text/javascript"></script>

<!-- <script src="/js/DateWheel.js" type="text/javascript"></script>-->
 <!-- <script data-main="js/main" src="js/lib/require/require.js"></script> -->

    <style>

    </style>
</head>
<body id="expenseManager">
    <script type="text/template" id="expenseItem">
        <tr>
            <td><%= strCategory %> </td>
            <td><%= uAmount %> </td>
            <td><%= notes %> </td>
            <td><input id="btnDeleteExpense" type="button" class="delete expense" />
                <input id="<%=ExpenseManager.StringConstants.InitExpenseInputField +uExpenseId %>" type="hidden" value="<%= uExpenseId %>"/>
            </td>
        </tr>
    </script>

    <script type="text/template" id="categoryItem">
        <li>
            <label> <%= strCategory %></label>
            <input id="btnDeleteCategory" type="button" class="delete category" />
            <input id="<%=ExpenseManager.StringConstants.InitCategoryInputField + uCategoryId%>" type="hidden" value="<%= uCategoryId %>"/>

        </li>
    </script>

	<script type="text/template" id="MemoItem">
		<div class="memoItem">
			<div class="header"> <%= source %> </div>
			<div class="details">
			<table>
				<tr>
					<th class="particulars">Particulars</th>
					<th class="amount" >Amount</th>
				</tr>
				<% i=0; %>
				<%
					details = Object.keys(details).map(function(k) { return details[k] });
					_.each(details, function(item){ %>

						<td>
							<%= item.categoryName %>
						</td>
						<td>
							<%= item.uAmount %>
						</td>
				</tr>
				 <% });	 %>
			<tr>
				<td>Total : </td>
				<td><%= total %></td>
			</tr>
			</table>

			</div>
		</div>
	</script>
    <!--
    <a href="/SRS.htm"> S.R.S.</a>
    <div style="width:300px;height:150px" id="dateWheel">

    </div>
    <div id="touchResponse"></div>
    -->

    <?php include 'header.php'?>
    <?php include 'menu.php'; ?>
    <div class="page-container">
        <div id="homeUI">
            <div class="left containers">
                <div id="addExpense">
                <div>
                    <div>Date :
                        <!--<div id="calenderDateBox" class="calenderDateBox">
                            <div id="calenderHeader" class="calenderHeader">

                            </div>
                            <div id="calenderDate" class="calenderDate">

                            </div>
                        </div>-->
                        <input type="text" id="TodayDate" value=" " readonly />
                    </div>
                    <input type="text" id="txtExpenseCategoryName"/>
                    <select id="cmbCategory" style ="display:none">
                    </select>
                    <input type="text" id="txtExpense" value="" placeholder="amount"/>
                    <textarea id='txtNotes' placeholder="notes"></textarea>
                </div>
                <input type="button" id="btnSave" name="Save" value="save" />
                    <div>Total Expense : <label id="txtTotalExpense"></label> </div>
					<div id="txtError" class="error"> </div>
                </div>
                <div id="todaysExpense">
                <table id="expenseTable" cellspacing=0>
                    <tbody id="expenseTablebody">
                        <tr id="tableHeader">
                            <th>Cateogry</th>
                            <th>Amount</th>
                            <th>Notes</th>
                            <th>Delete</th>
                        </tr>
                    </tbody>
                </table>
                </div>
             </div>
            <div class="center containers">
				<div>Cateogories</div>
				<div id="addCategory">
					<input type="text" id="txtCategoryName" placeholder="category name"/>
					<input type="button" id="btnAddCategory" value="Add"/>
					<ul id="categoryList">
					</ul>
				</div>
            </div>
            <div class="right">

            </div>
        </div>
        <div id="categories">
            <div id="loading">
                <div class="anim-loading-box"> </div>
                <div class="anim-loading-box2"> </div>
                <div class="anim-loading-box3"> </div>
            </div>
        </div>

		<?php include 'ExpenseGraph.php' ?>

        <div id="importExpense">

        </div>
        <div id="profileSettings">

        </div>
    </div>
</body>
</html>
