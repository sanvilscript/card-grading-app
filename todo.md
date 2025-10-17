devo creare un tools html js css utilizzanto tailwind come framework  per ocntorllare il centering delle carte tcg utilizzando per ora un api come mostrato qui sotto 



api per il centering request 

curl --url https://api.ximilar.com/card-grader/v2/centering
 --request POST 
 --header "Content-Type: application/json"
 --header "Authorization: Token 4262ab15b38bfea843019bd8dc62f6d26d3d8658" 
 --data '{
  "records": [
    {
      "_base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QECRXhpZgAATU0AKgAAAAgABwEOAAIAAAALAAAAYgESAAMAAAABAAEAAAEaAAUAAAABAAAAbgEbAAUAAAABAAAAdgEoAAMAAAABAAIAAAEyAAIAAAAUAAAAfodpAAQAAAABAAAAkgAAAABTY3JlZW5zaG90AAAAAACQAAAAAQAAAJAAAAABMjAyNTowOToyMCAxODo



response 
{
  "records": [
    {
      "_status": {
        "code": 200,
        "text": "OK",
        "request_id": "38e7a4d3-41ac-4677-a48f-f28d83bd7eef"
      },
      "_id": "5d396d69-796a-40ca-b773-d51ac52e9581",
      "_width": 1290,
      "_height": 1759,
      "_objects": [
        {
          "name": "Card",
          "id": "e0f155e9-2978-4524-bae2-3d7d3377c2c4",
          "bound_box": [
            16,
            80,
            1101,
            1701
          ],
          "prob": 0.9280220866203308
        }
      ],
      "_points": [
        [
          15.6043,
          138.8048
        ],
        [
          1099.4767000000002,
          119.7872
        ],
        [
          1119.5230999999999,
          1629.479
        ],
        [
          33.3727,
          1639.4972
        ]
      ],
      "card": [
        {
          "name": "CARD",
          "polygon": [
            [
              15,
              138
            ],
            [
              1099,
              119
            ],
            [
              1119,
              1629
            ],
            [
              33,
              1639
            ]
          ],
          "bound_box": [
            0,
            41,
            1139,
            1739
          ],
          "_tags": {
            "Category": [
              {
                "prob": 0.99779,
                "name": "Card/Trading Card Game",
                "id": "089fa0cd-a399-4c6c-8420-d52a55c0ff02"
              }
            ],
            "Autograph": [
              {
                "prob": 0.92647,
                "name": "No",
                "id": "45ef0f10-f4c5-4065-aaab-89384369b925"
              }
            ],
            "Side": [
              {
                "prob": 0.93937,
                "name": "Front",
                "id": "3ebc6fc4-41d4-4432-99f1-5f8c50f10413"
              }
            ]
          },
          "centering": {
            "left/right": "49/51",
            "top/bottom": "55/45",
            "bound_box": [
              56,
              59,
              1028,
              1460
            ],
            "pixels": [
              56,
              59,
              58,
              49
            ],
            "offsets": [
              0.0524,
              0.0396,
              0.0535,
              0.0329
            ],
            "grade": 9.5
          }
        }
      ],
      "versions": {
        "detection": "e21f943b",
        "points": "f6cac813_4",
        "centering": "5bb1214a_4"
      },
      "grades": {
        "centering": 9.5
      },
      "_exact_url_card": "https://s3-eu-west-1.amazonaws.com/ximilar-tmp-images/card-grading/eaf07b77-612a-4334-932e-0c8f3da795ee.webp",
      "_clean_url_card": "https://s3-eu-west-1.amazonaws.com/ximilar-tmp-images/card-grading/f0c7e81c-f03c-4900-9cfa-caafa6acc427.webp"
    }
  ],
  "statistics": {
    "time_stats": {
      "GenericProcessor": 4.610225439071655,
      "AuthorizeProcessor": 0.14161396026611328,
      "ImgDataLoader": 0.06509804725646973,
      "CardTransparent": 0.0000057220458984375,
      "CardCutter": 3.1200852394104004,
      "CardGrader": 0.8265628814697266,
      "CardDrawer": 0.002783536911010742,
      "ExactCardBucketS3": 0.5897417068481445,
      "ExactCleanCardBucketS3": 0.5770580768585205,
      "AsyncProcessorCaller": 0.5926101207733154,
      "DataCleaner": 0.00001621246337890625
    },
    "processing time": 4.762855291366577
  },
  "status": {
    "code": 200,
    "text": "OK",
    "request_id": "38e7a4d3-41ac-4677-a48f-f28d83bd7eef",
    "proc_id": "b94afdea-c362-48f4-965f-0d7bcb56e603"
  }
}






grading request

curl --url https://api.ximilar.com/card-grader/v2/grade
 --request POST 
 --header "Content-Type: application/json"
 --header "Authorization: Token 4262ab15b38bfea843019bd8dc62f6d26d3d8658" 
 --data '{
  "records": [
    {
      "_base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAkACQAAD/4QECRXhpZgAATU0AKgAAAAgABwEOAAIAAAALAAAAYgESAAMAAAABAAEAAAEaAAUAAAABAAAAbgEbAAUAAAABAAAAdgEoAAMAAAABAAIAAAEyAAIAAAAUAAA


#response
{
  "records": [
    {
      "_status": {
        "code": 200,
        "text": "OK",
        "request_id": "72f529f6-d510-4185-be7b-fe394b420660"
      },
      "_id": "7df8cdd5-b7d5-4c82-a537-7abbf0167c69",
      "_width": 1290,
      "_height": 1759,
      "_objects": [
        {
          "name": "Card",
          "id": "e0f155e9-2978-4524-bae2-3d7d3377c2c4",
          "bound_box": [
            16,
            80,
            1101,
            1701
          ],
          "prob": 0.9280220866203308
        }
      ],
      "_points": [
        [
          15.6043,
          138.8048
        ],
        [
          1099.4767000000002,
          119.7872
        ],
        [
          1119.5230999999999,
          1629.479
        ],
        [
          33.3727,
          1639.4972
        ]
      ],
      "corners": [
        {
          "name": "UPPER_LEFT",
          "bound_box": [
            0,
            98,
            89,
            212
          ],
          "point": [
            15,
            138
          ],
          "grade": 7.5
        },
        {
          "name": "UPPER_RIGHT",
          "bound_box": [
            1024,
            79,
            1138,
            193
          ],
          "point": [
            1099,
            119
          ],
          "grade": 3
        },
        {
          "name": "DOWN_RIGHT",
          "bound_box": [
            1044,
            1554,
            1158,
            1668
          ],
          "point": [
            1119,
            1629
          ],
          "grade": 7.5
        },
        {
          "name": "DOWN_LEFT",
          "bound_box": [
            0,
            1564,
            107,
            1678
          ],
          "point": [
            33,
            1639
          ],
          "grade": 8
        }
      ],
      "edges": [
        {
          "name": "UPPER",
          "polygon": [
            [
              94,
              98
            ],
            [
              1019,
              79
            ],
            [
              1019,
              198
            ],
            [
              94,
              217
            ]
          ],
          "grade": 8.5
        },
        {
          "name": "RIGHT",
          "polygon": [
            [
              1019,
              198
            ],
            [
              1138,
              198
            ],
            [
              1158,
              1549
            ],
            [
              1039,
              1549
            ]
          ],
          "grade": 8.5
        },
        {
          "name": "DOWN",
          "polygon": [
            [
              112,
              1559
            ],
            [
              1039,
              1549
            ],
            [
              1039,
              1668
            ],
            [
              112,
              1678
            ]
          ],
          "grade": 8
        },
        {
          "name": "LEFT",
          "polygon": [
            [
              -24,
              217
            ],
            [
              94,
              217
            ],
            [
              112,
              1559
            ],
            [
              -6,
              1559
            ]
          ],
          "grade": 9
        }
      ],
      "card": [
        {
          "name": "CARD",
          "polygon": [
            [
              15,
              138
            ],
            [
              1099,
              119
            ],
            [
              1119,
              1629
            ],
            [
              33,
              1639
            ]
          ],
          "bound_box": [
            0,
            41,
            1139,
            1739
          ],
          "_tags": {
            "Category": [
              {
                "prob": 0.99778,
                "name": "Card/Trading Card Game",
                "id": "089fa0cd-a399-4c6c-8420-d52a55c0ff02"
              }
            ],
            "Damaged": [
              {
                "prob": 0.98918,
                "name": "OK",
                "id": "8d77cbf2-96de-4e45-b518-ea09cf77483a"
              }
            ],
            "Autograph": [
              {
                "prob": 0.92647,
                "name": "No",
                "id": "45ef0f10-f4c5-4065-aaab-89384369b925"
              }
            ],
            "Side": [
              {
                "prob": 0.93937,
                "name": "Front",
                "id": "3ebc6fc4-41d4-4432-99f1-5f8c50f10413"
              }
            ]
          },
          "surface": {
            "grade": 7
          },
          "centering": {
            "left/right": "49/51",
            "top/bottom": "55/45",
            "bound_box": [
              56,
              59,
              1028,
              1460
            ],
            "pixels": [
              56,
              59,
              58,
              49
            ],
            "offsets": [
              0.0524,
              0.0396,
              0.0535,
              0.0329
            ],
            "grade": 9.5
          }
        }
      ],
      "versions": {
        "detection": "e21f943b",
        "points": "f6cac813_4",
        "corners": "5d12cc01_2",
        "edges": "ac144d3d_2",
        "surface": "7ba660de_11",
        "centering": "5bb1214a_4",
        "final": "5d12cc01_2-ac144d3d_2-7ba660de_11-5bb1214a_4-e21f943b-f6cac813_4"
      },
      "grades": {
        "corners": 6,
        "edges": 8.5,
        "surface": 7,
        "centering": 9.5,
        "final": 7.5,
        "condition": "Near Mint"
      },
      "_full_url_card": "https://s3-eu-west-1.amazonaws.com/ximilar-tmp-images/card-grading/bca01b3f-fbef-4ef5-80c7-c426e1869a30.webp",
      "_exact_url_card": "https://s3-eu-west-1.amazonaws.com/ximilar-tmp-images/card-grading/e2fd3521-22d6-4230-a9e9-30d7474e5bfb.webp"
    }
  ],
  "statistics": {
    "time_stats": {
      "GenericProcessor": 5.3214194774627686,
      "AuthorizeProcessor": 0.13142967224121094,
      "ImgDataLoader": 0.0868375301361084,
      "CardTransparent": 0.00000858306884765625,
      "CardCutter": 2.939680337905884,
      "CardGrader": 1.4769556522369385,
      "CardDrawer": 0.009002447128295898,
      "FullCardBucketS3": 0.7958757877349854,
      "ExactCardBucketS3": 0.7565326690673828,
      "AsyncProcessorCaller": 0.8045728206634521,
      "DataCleaner": 0.00002288818359375
    },
    "processing time": 5.464030981063843
  },
  "status": {
    "code": 200,
    "text": "OK",
    "request_id": "72f529f6-d510-4185-be7b-fe394b420660",
    "proc_id": "8799e0f2-954d-4858-9eea-52bbdba846b8"
  }
}