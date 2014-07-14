<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Expense Manager</title>
<link href="/ExpenseManager/css/jquery-ui-1.10.4.css" rel="stylesheet" type="text/css" />
<link href="/ExpenseManager/css/style.css" rel="stylesheet" type="text/css" />
<link href="/ExpenseManager/css/menu.css" rel="stylesheet" type="text/css" />
<link href="/ExpenseManager/css/ExpenseManager.css" rel="stylesheet" type="text/css" />

<script src="/ExpenseManager/js/lib/underscore/underscore.js"></script>
<script src="/ExpenseManager/js/lib/jquery/jquery-1.11.0.js"></script>
<script src="/ExpenseManager/js/lib/backbone/backbone.js"></script>
<script src="/ExpenseManager/js/lib/jquery/jquery-ui-1.10.4.js"></script>
<script src="/ExpenseManager/js/lib/handlebars/handlebars-v1.3.0.js"></script>


<script src="/ExpenseManager/js/main.js"></Script>
<script src="/ExpenseManager/js/constants/StringConstants.js"> </script>
<script src="/ExpenseManager/js/model/Model.js" type="text/javascript"></script>
<script src="/ExpenseManager/js/view/View.js" type="text/javascript"></script>
<script src="/ExpenseManager/js/view/HomeUI.js" type="text/javascript"></script>
<!-- <script src="/ExpenseManager/js/handles/expenses.handlebars"></script> -->
<script src="/ExpenseManager/js/ExpenseManager.js" type="text/javascript"></script>

<!-- <script src="/ExpenseManager/js/DateWheel.js" type="text/javascript"></script>-->
 <!-- <script data-main="js/main" src="js/lib/require/require.js"></script> -->
</head>
<body>
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
    <!--
    <a href="/ExpenseManager/SRS.htm"> S.R.S.</a>
    <div style="width:300px;height:150px" id="dateWheel">

    </div>
    <div id="touchResponse"></div>
    -->

    <?php include 'header.php'?>
    <?php include 'menu.php'; ?>
    <div class="page-container">
        <div class="left containers">
            <div id="addExpense">
            <div>
                <div>Date :
                <input type="text" id="TodayDate" value=" " readonly />
                </div>

                <select id="cmbCategory">
                </select>
                <input type="text" id="txtExpense" value="" placeholder="amount"/>
                <textarea id='txtNotes' placeholder="notes"></textarea>
            </div>
            <input type="button" id="btnSave" name="Save" value="save" />
                <div>Total Expense : <label id="txtTotalExpense"></label> </div>
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
</body>
</html>
