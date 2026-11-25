#!/bin/bash

# S3 buckets
aws s3 mb s3://cdp-example-node-frontend
aws s3 mb s3://cdp-uploader-quarantine

# SQS queues used by cdp-uploader
aws sqs create-queue --queue-name cdp-clamav-results
aws sqs create-queue --queue-name cdp-uploader-scan-results-callback.fifo --attributes '{"FifoQueue":"true","ContentBasedDeduplication":"true"}'
aws sqs create-queue --queue-name cdp-uploader-download-requests

# cdp-uploader mock virus scan: new files in the quarantine bucket are sent to the mock-clamav queue
aws sqs create-queue --queue-name mock-clamav
aws s3api put-bucket-notification-configuration --bucket cdp-uploader-quarantine --notification-configuration '{"QueueConfigurations": [{"QueueArn": "arn:aws:sqs:eu-west-2:000000000000:mock-clamav","Events": ["s3:ObjectCreated:*"]}]}'
