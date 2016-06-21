<?php

return array(
    // set your paypal credential
    'client_id' => 'AcwVRZD8YpUh-KfcDPNWrS75V_BJxSHIuNe2afN0GY6Qc77n6PDuL-CJFUCMElwfovhd_pPSqmb09gQr',
    'secret' => 'EByT37moWkJmEqpiRQUqqQNscAuh2DdNkyYx_AkCiYs9nRvGj_ic16V1zuT0bVnTcahuu1Pmu_H_MmTG',

    /**
     * SDK configuration
     */
    'settings' => array(
        /**
         * Available option 'sandbox' or 'live'
         */
        'mode' => 'sandbox',

        /**
         * Specify the max request time in seconds
         */
        'http.ConnectionTimeOut' => 30,

        /**
         * Whether want to log to a file
         */
        'log.LogEnabled' => true,

        /**
         * Specify the file that want to write on
         */
        'log.FileName' => storage_path() . '/logs/paypal.log',

        /**
         * Available option 'FINE', 'INFO', 'WARN' or 'ERROR'
         *
         * Logging is most verbose in the 'FINE' level and decreases as you
         * proceed towards ERROR
         */
        'log.LogLevel' => 'FINE'
    ),
);
