<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href='https://fonts.googleapis.com/css?family=Aladin' rel='stylesheet'>
    <title>Generate PDF</title>
    <style>
        @Media Print 
        {
            * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;   /* Chrome, Safari */
    color-adjust: exact !important;   
            }

            body {
                margin: 0px 15% !important;
                font-family: Arial, Helvetica, sans-serif;
            }

            /* Style the header */
            header {
                background-color: #159ec7e3;
                padding: 10px;
                text-align: center;
                color: #0c0c0cf2;
                font-family: 'Aladin';
                -webkit-print-color-adjust: exact; 
                background-image: url('http://patholab.doctor.com/API/asset/img/logo.jpeg');
            background-repeat: no-repeat;
            background-position: center center;
            height: 302px;
            }

            #background{
            opacity: .5;
            position:absolute;
            z-index:0;
            background:white;
            width:75%;
            display:block;
            color:yellow;
        }
        #bg-text
        {
            color:lightgrey;
            font-size:120px;
            /* transform:rotate(300deg);
            -webkit-transform:rotate(300deg); */
            width:100%;
            min-width: 260px;
            min-height:200px;
            text-align: center;
            background-image:url('http://patholab.doctor.com/API/asset/img/demo-image.png');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 240px 200px;
        }
        #content{
            z-index: 10001;
            position: relative;
        }

            h2 {
                font-size: 30px;
            }

            table {
                width: 100%;
            }

            table,
            th,
            td {
                border: 1px solid black;
                border-collapse: collapse;
                -webkit-print-color-adjust: exact; 
            }

            th,
            td {
                padding: 15px;
                text-align: left;
            }
            footer {
                background-color: #159ec7e3;
                padding: 2px;
                text-align: center;
                color: black;
                font-family: 'Aladin';
                -webkit-print-color-adjust: exact; 
            }
            button {
                background-color: #f44336; /* Green */
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }
            #printPageButton {
                display: none;
            }
        }
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0px 12% !important;
            font-family: Arial, Helvetica, sans-serif;
        }

        /* Style the header */
        header {
            background-color: #159ec7e3;
            padding: 10px;
            text-align: center;
            color: #0c0c0cf2;
            font-family: 'Aladin';
            background-image: url('http://patholab.doctor.com/API/asset/img/logo.jpeg');
            background-repeat: no-repeat;
            background-position: center center;
            height: 302px;
        }

        h2 {
            font-size: 30px;
        }

        table {
            width: 100%;
        }

        table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 15px;
            text-align: left;
        }
        footer {
            background-color: #159ec7e3;
            padding: 2px;
            text-align: center;
            color: black;
            font-family: 'Aladin';
             z-index: 10001;
            position: relative;
        }
        button {
            background-color: #f44336; /* Green */
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            position: absolute;
    right: 90%;
        }
        #background{
            opacity: .5;
            position:absolute;
            z-index:0;
            background:white;
            width:75%;
            display:block;
            color:yellow;
        }
        #bg-text
        {
            color:lightgrey;
            font-size:120px;
            /* transform:rotate(300deg);
            -webkit-transform:rotate(300deg); */
            width:100%;
            min-width: 260px;
            min-height:200px;
            text-align: center;
            background-image:url('http://patholab.doctor.com/API/asset/img/watermark.jpeg');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 240px 200px;
        }
        #content{
            z-index: 10001;
            position: relative;
        }

        /* .myTableBg4 { 
            width:100%;
            min-width: 260px;
            min-height:200px;
            text-align: center;
            background-image:url('http://patholab.doctor.com/API/asset/img/demo-image.png');
            background-repeat: no-repeat;
            background-position: center center;
            border: 1px solid black;
        } */
    @page {  margin: 0mm; }
    </style>
</head>

<body>
    <header>
        <button onclick="window.print();" id="printPageButton">Print</button>
        <!-- <h2 style="text-transform: capitalize;">GEN CARE DIAGNOSTICS</h2>
        <b>Malha sahi ,Mangalabag, Cuttack-753001</b><br>
        <b>Mobile number: 9658853143 / 9861148791</b>
        <h3>BILL</h3> -->
    </header>
    <div id="background">
        <p id="bg-text"></p>
    </div>
    <div id="content">

        <table>
            <tr>
                <td>Name: <b><?php echo $patientDetails['patient_name'];?></b></td>
                <td>Number: <b><?php echo $patientDetails['patient_number'];?></b></td>
                <td rowspan="2">Date: <?php echo date('d/m/Y') ?></td>
            </tr>
            <tr>
                <td>Age : <b><?php echo $patientDetails['patient_age'];?></b></td>
                <td>Gender : <b><?php echo $patientDetails['patient_gender'];?></b></td>
            </tr>
            <tr>
                <td colspan="3">Address : <b><?php echo stripslashes($patientDetails['address']);?></b></td>
            </tr>
        </table>
        <table >
            <thead>
                <th width="30%">SL NO. Particulars</th>
                <th width="40%"></th>
                <th width="30%" style="text-align:center">Amount In (RS .)</th>
            </thead>
            <tbody>
                <?php 
                 $total = 0;
                 
                function getIndianCurrency(float $number)
                {
                    $decimal = round($number - ($no = floor($number)), 2) * 100;
                    $hundred = null;
                    $digits_length = strlen($no);
                    $i = 0;
                    $str = array();
                    $words = array(0 => '', 1 => 'one', 2 => 'two',
                        3 => 'three', 4 => 'four', 5 => 'five', 6 => 'six',
                        7 => 'seven', 8 => 'eight', 9 => 'nine',
                        10 => 'ten', 11 => 'eleven', 12 => 'twelve',
                        13 => 'thirteen', 14 => 'fourteen', 15 => 'fifteen',
                        16 => 'sixteen', 17 => 'seventeen', 18 => 'eighteen',
                        19 => 'nineteen', 20 => 'twenty', 30 => 'thirty',
                        40 => 'forty', 50 => 'fifty', 60 => 'sixty',
                        70 => 'seventy', 80 => 'eighty', 90 => 'ninety');
                    $digits = array('', 'hundred', 'thousand', 'lakh', 'crore');
                    while ($i < $digits_length) {
                        $divider = ($i == 2) ? 10 : 100;
                        $number = floor($no % $divider);
                        $no = floor($no / $divider);
                        $i += $divider == 10 ? 1 : 2;
                        if ($number) {
                            $plural = (($counter = count($str)) && $number > 9) ? 's' : null;
                            $hundred = ($counter == 1 && $str[0]) ? ' and ' : null;
                            $str[] = ($number < 21) ? '<b>'. $words[$number] . ' ' . $digits[$counter] . $plural . ' ' . $hundred.'</b>' : '<b>' .$words[floor($number / 10) * 10] . ' ' . $words[$number % 10] . ' ' . $digits[$counter] . $plural . ' ' . $hundred . '</b>';
                        } else {
                            $str[] = null;
                        }
    
                    }
                    $Rupees = implode('', array_reverse($str));
                    $paise = ($decimal > 0) ? " And <b>" . ($words[$decimal / 10] . " " . $words[$decimal % 10]) . ' </b>Paise' : '';
                    return ($Rupees ? $Rupees . 'Rupees ' : '') . $paise;
                }
    
                  foreach ($reportArray as $key => $value) {
                      # code...
                      $reportId = $value['patient_id'];
                      
               ?>
                <tr>
                    <td><?php echo $value['report_name'] ?></td>
                    <td></td>
                    <td style="text-align:center"><?php echo $value['report_price'] ?></td>
                </tr>
                <?php  
                   $total += $value['report_price'];
                  }
                  $address = addslashes($patientDetails['address']);
                  $sql = "INSERT INTO `text_details_report`(`patient_id`, `report_id`, `name`, `age`, `gender`, `address`, `total_report_price`) VALUES ('".$patientDetails['id']."','$reportId','".$patientDetails['patient_name']."','".$patientDetails['patient_age']."','".$patientDetails['patient_gender']."','$address','$total')";
                  $result = $this->textModel->insertAllReport($sql);
                  
                ?>
                <tr>
                    <td colspan="2" style="text-transform:uppercase"><?php echo getIndianCurrency($total);?></td>
                    <td style='text-align:right'>Total Amount: <b>₹<?php echo $total; ?></b></td>
                </tr>
                <tr>
                    <td colspan="3">
                        <b>Signature :-</b>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <footer>
        <p>Invoice was created on a computer and is valid without the signature and seal.<br>Billing software designed by softech18(9937857561) www.softech18.com</p>
    </footer>
    <script src="http://patholab.doctor.com/js/jquery.mini.js"></script>
    <script>
        var ctrlKeyDown = false;
        $(document).ready(function(){    
            $(document).on("keydown", keydown);
            $(document).on("keyup", keyup);
            
    $(document)[0].oncontextmenu = function() { return false; }

    $(document).mousedown(function(e) {
        if( e.button == 2 ) {
            alert('Sorry, this functionality is disabled!');
            return false;
        } else {
            return true;
        }
    });
        });

        function keydown(e) { 

            if ((e.which || e.keyCode) == 116 || ((e.which || e.keyCode) == 82 && ctrlKeyDown)) {
                // Pressing F5 or Ctrl+R
                e.preventDefault();
            } else if ((e.which || e.keyCode) == 17) {
                // Pressing  only Ctrl
                ctrlKeyDown = true;
            }
        };

        function keyup(e){
            // Key up Ctrl
            if ((e.which || e.keyCode) == 17) 
                ctrlKeyDown = false;

            if (e.keyCode == 13) {               
                e.preventDefault();
                return false;
            }

        };
    </script>
</body>

</html>